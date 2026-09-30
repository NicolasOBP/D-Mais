import { useEffect, useMemo } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import {
	Easing,
	cancelAnimation,
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated"

import { Canvas, Path, Skia } from "@shopify/react-native-skia"

// 1. Your raw path strings
const SVG_CHEVRON =
	"M 7 4 C 9.33 6 11.66 8 14 10 C 12.84 11 11.67 12 10.5 13 C 9.34 14 8.17 15 7 16"
const SVG_LOADING =
	"M 10 3 C 13.86 3 17 6.14 17 10 C 17 13.86 13.86 17 10 17 C 6.14 17 3 13.86 3 10"
const ORIGINAL_SVG_SIZE = 20

type Props = {
	isPending: boolean
	onCheckout: () => void
	size?: number
	color?: string
}

export function MorphingSubmitButton({ isPending, onCheckout, size = 50, color = "white" }: Props) {
	const morphProgress = useSharedValue(1)
	const rotation = useSharedValue(0)

	const { pathChevron, pathLoading } = useMemo(() => {
		const chevron = Skia.Path.MakeFromSVGString(SVG_CHEVRON)!
		const loading = Skia.Path.MakeFromSVGString(SVG_LOADING)!

		// Mathematical proportion: target size divided by original 20x20 base size
		const scaleFactor = size / ORIGINAL_SVG_SIZE
		const scaleMatrix = Skia.Matrix()
		scaleMatrix.scale(scaleFactor, scaleFactor)

		chevron.transform(scaleMatrix)
		loading.transform(scaleMatrix)

		return { pathChevron: chevron, pathLoading: loading }
	}, [size])

	useEffect(() => {
		morphProgress.value = withTiming(isPending ? 0 : 1, { duration: 300 })

		if (isPending) {
			rotation.value = withRepeat(
				withTiming(360, { duration: 1000, easing: Easing.linear }),
				-1,
				false,
			)
		} else {
			cancelAnimation(rotation)
			rotation.value = withTiming(0, { duration: 300 })
		}
	}, [isPending, morphProgress, rotation])

	const animatedPath = useDerivedValue(() => {
		const interpolated = pathChevron.interpolate(pathLoading, morphProgress.value)
		return interpolated ?? Skia.Path.Make()
	})

	const animatedRotation = useDerivedValue(() => {
		return [{ rotate: (rotation.value * Math.PI) / 180 }]
	})

	return (
		<View style={styles.container}>
			<Pressable onPress={onCheckout} disabled={isPending}>
				<Canvas style={{ width: size, height: size }}>
					<Path
						path={animatedPath}
						color={color}
						style="stroke"
						strokeWidth={4}
						strokeCap="round"
						strokeJoin="round"
						origin={{ x: size / 2, y: size / 2 }}
						transform={animatedRotation}
					/>
				</Canvas>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
})
