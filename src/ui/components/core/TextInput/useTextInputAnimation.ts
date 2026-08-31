import { useEffect } from "react"

import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"

import { type ThemeColor, useAppTheme } from "@theme"

export function useTextInputBorderAnimation(
	isFocused: boolean,
	borderColor: ThemeColor,
	borderColorOnFocus: ThemeColor,
	backgroundColor: ThemeColor,
	backgroundColorOnFocus: ThemeColor,
) {
	const { colors } = useAppTheme()
	const progress = useSharedValue(0)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended bahavior>
	useEffect(() => {
		progress.value = withTiming(isFocused ? 1 : 0, {
			duration: 300,
		})
	}, [isFocused])

	return useAnimatedStyle(() => ({
		borderColor: interpolateColor(
			progress.value,
			[0, 1],
			[colors[borderColor], colors[borderColorOnFocus]],
		),
		backgroundColor: interpolateColor(
			progress.value,
			[0, 1],
			[colors[backgroundColor], colors[backgroundColorOnFocus]],
		),
	}))
}
