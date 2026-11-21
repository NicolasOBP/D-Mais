import { type SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated"

import { useAppTheme } from "@theme"

export function useBackToSellAnimation({
	loadingProgress,
	progress,
}: {
	progress: SharedValue<number>
	loadingProgress: SharedValue<number>
}) {
	const { spacing, borderRadii, colors } = useAppTheme()

	const showBackToSellButtonAnimation = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(progress.value, [0, 1], [spacing.s75, -30]),
			},
		],
		opacity: 0.9,
		backgroundColor: colors.secondary,
		borderTopLeftRadius: borderRadii.default,
		borderBottomLeftRadius: borderRadii.default,
	}))

	const loadingAnimation = useAnimatedStyle(() => ({
		transform: [{ rotate: `${loadingProgress.value}deg` }],
	}))

	return { showBackToSellButtonAnimation, loadingAnimation }
}
