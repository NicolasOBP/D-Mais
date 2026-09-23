import { useEffect } from "react"

import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated"

import { useAppTheme } from "@theme"

import { Box } from "@core-components"

export function TotalPriceLoadingAnimation() {
	const { colors } = useAppTheme()
	const shimmerPosition = useSharedValue(-1)

	useEffect(() => {
		shimmerPosition.value = withRepeat(
			withTiming(2, {
				duration: 1300,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
		)
	}, [shimmerPosition])

	const shimmerStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: shimmerPosition.value * 80 - 40 }],
	}))

	return (
		<Box bg="lightGreen" width={70} height={18} borderRadius="checkbox" overflow="hidden">
			<Animated.View
				style={[
					{
						position: "absolute",
						top: 0,
						bottom: 0,
						width: 35,
						backgroundColor: colors.loadingBackground,
					},
					shimmerStyle,
				]}
			/>
		</Box>
	)
}
