import { type SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated"

import { useAppTheme } from "@theme"

export function useDropDownInputAnimation(progress: SharedValue<number>) {
	const { borderRadii } = useAppTheme()

	return useAnimatedStyle(() => ({
		borderBottomLeftRadius: interpolate(progress.value, [0, 1], [borderRadii.inputField, 0]),
		borderBottomRightRadius: interpolate(progress.value, [0, 1], [borderRadii.inputField, 0]),
		borderBottomWidth: interpolate(progress.value, [0, 1], [1, 2]),
	}))
}
