import { type SharedValue, useAnimatedStyle } from "react-native-reanimated"

export function useProgressBarAnimation(
	progress: SharedValue<number>,
	height: number,
	borderRadius: number,
) {
	return useAnimatedStyle(() => ({
		width: `${Math.min(Math.max(progress.value, 0), 1) * 100}%`,
		height,
		borderRadius,
	}))
}
