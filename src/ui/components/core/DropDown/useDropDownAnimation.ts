import { type SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated"

import { type ThemeColor, useAppTheme } from "@theme"

export const useDropDownAnimation = (
	progress: SharedValue<number>,
	height: SharedValue<number>,
	borderColor: ThemeColor,
) => {
	const { borderRadii, colors } = useAppTheme()

	return useAnimatedStyle(() => ({
		opacity: 1,
		height: interpolate(progress.value, [0, 1], [0, height.value]),
		borderTopLeftRadius: interpolate(progress.value, [0, 1], [borderRadii.inputField, 0]),
		borderTopRightRadius: interpolate(progress.value, [0, 1], [borderRadii.inputField, 0]),
		borderBottomLeftRadius: interpolate(progress.value, [0, 1], [0, borderRadii.inputField]),
		borderBottomRightRadius: interpolate(progress.value, [0, 1], [0, borderRadii.inputField]),
		borderWidth: interpolate(progress.value, [0, 1], [0, 1]),
		zIndex: 6,
		borderColor: colors[borderColor],
	}))
}
