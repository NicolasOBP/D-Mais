import { useEffect } from "react"
import { ActivityIndicator } from "react-native"

import {
	createAnimatedComponent,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"

import { useAppTheme } from "@theme"

import { PressableBox, type PressableBoxProps } from "../Box/PressableBox"
import { Text } from "../Text/Text"

import { type ButtonVariant, buttonVariants } from "./ButtonVariants"

type ButtonProps = PressableBoxProps & {
	lable: string
	variant: ButtonVariant
	disabled?: boolean
	isLoading?: boolean
}

export function Button({
	onPress,
	lable,
	variant,
	disabled,
	isLoading,
	...buttonProps
}: ButtonProps) {
	const { colors } = useAppTheme()
	const boxVariant = buttonVariants[variant].boxStyle
	const textVariant = buttonVariants[variant].textVariant
	const progress = useSharedValue(0)

	const PressableBoxAnimated = createAnimatedComponent(PressableBox)

	const enabledColor = boxVariant.backgroundColor
	const disabledColor = buttonVariants.disabled.boxStyle.backgroundColor

	// biome-ignore lint/correctness/useExhaustiveDependencies: <unintended bahivior>
	useEffect(() => {
		progress.value = withTiming(disabled || isLoading ? 1 : 0, {
			duration: 500,
		})
	}, [disabled, isLoading])

	const animatedBackgroundColor = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			progress.value,
			[0, 1],
			[colors[enabledColor!], colors[disabledColor!]],
		),
	}))

	return (
		<PressableBoxAnimated
			onPress={onPress}
			{...boxVariant}
			{...buttonProps}
			disabled={disabled}
			style={[animatedBackgroundColor, buttonProps.style]}
		>
			{isLoading ? (
				<ActivityIndicator color={colors.contrastPrimary} size={22} />
			) : (
				<Text variant={textVariant}>{lable}</Text>
			)}
		</PressableBoxAnimated>
	)
}
