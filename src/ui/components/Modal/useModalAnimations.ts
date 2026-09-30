import {
	type DerivedValue,
	type SharedValue,
	interpolate,
	useAnimatedStyle,
	withDelay,
	withTiming,
} from "react-native-reanimated"

import { useAppTheme } from "@theme"

type Props = {
	modalOpen: SharedValue<boolean>
	DURATION: number
	progress: DerivedValue<number>
	height?: SharedValue<number>
}

export function useModalAnimations({ DURATION, modalOpen, progress, height }: Props) {
	const { colors, borderRadii } = useAppTheme()
	const backdropAnimatedStyle = useAnimatedStyle(() => ({
		zIndex: modalOpen.value ? 100 : withDelay(DURATION, withTiming(-1, { duration: 0 })),
		opacity: 1 - progress.value,
	}))

	const modalAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: interpolate(progress.value, [1, 0], [0.3, 1]),
			},
		],
		height: height?.value,
		backgroundColor: colors.background,
		borderRadius: borderRadii.default,
	}))

	return { backdropAnimatedStyle, modalAnimatedStyle }
}
