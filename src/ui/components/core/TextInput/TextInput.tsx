import { useRef, useState } from "react"
import {
	type LayoutChangeEvent,
	Pressable,
	TextInput as RNTextInput,
	type TextInputProps as RNTextInputProps,
	type StyleProp,
	type ViewStyle,
} from "react-native"

import { type AnimatedStyle, createAnimatedComponent } from "react-native-reanimated"

import { useAppTheme } from "@theme"

import { Box, type BoxProps } from "../Box/Box"
import { Text } from "../Text/Text"

import { type TextInputVariant, textInputVariant } from "./TextInputVariant"
import { useTextInputBorderAnimation } from "./useTextInputAnimation"

export interface TextInputProps extends RNTextInputProps {
	label?: string
	errorMessage?: string
	RighComponent?: React.ReactElement
	LeftComponent?: React.ReactElement
	textFieldStyle?: BoxProps
	variant?: TextInputVariant
	onLayout?: (e: LayoutChangeEvent) => void
	animatedStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
	isRequired?: boolean
}

const AnimatedBox = createAnimatedComponent(Box)

export function TextInput({
	textFieldStyle,
	label,
	errorMessage,
	RighComponent,
	LeftComponent,
	variant = "primary",
	onLayout,
	animatedStyle,
	isRequired = false,
	...textInputProps
}: TextInputProps) {
	const [absoluteTopSpacing, setAbsoluteTopSpacing] = useState(0)
	const { textVariants, colors } = useAppTheme()
	const [isFocused, setIsFocused] = useState(false)

	const inputRef = useRef<RNTextInput>(null)

	const inputVariant = textInputVariant[variant]
	const animatedBorderStyle = useTextInputBorderAnimation(
		isFocused,
		inputVariant.borderColor,
		inputVariant.borderColorOnFocus,
		inputVariant.backgroundColor,
		inputVariant.backGroundColorOnFocus,
	)

	const focusInput = () => {
		inputRef.current?.focus()
	}
	return (
		<Box flexGrow={1} flexShrink={1} onLayout={onLayout}>
			<Pressable
				onPress={focusInput}
				onLayout={(e) => setAbsoluteTopSpacing(e.nativeEvent.layout.height)}
			>
				{label && (
					<Box flexDirection="row">
						<Text variant="title12" mb="s4">
							{label}
						</Text>
						{isRequired && (
							<Text color="errorText" variant="text16Bold" ml="s4">
								*
							</Text>
						)}
					</Box>
				)}

				<AnimatedBox
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					gap="s8"
					{...textFieldStyle}
					{...inputVariant}
					style={[animatedStyle, animatedBorderStyle]}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				>
					{LeftComponent && (
						<Box justifyContent="center" alignItems="center">
							{LeftComponent}
						</Box>
					)}

					<RNTextInput
						ref={inputRef}
						autoCapitalize="none"
						placeholderTextColor={colors.gray2}
						{...textInputProps}
						style={[
							textInputProps.style,
							{
								padding: 0,
								margin: 0,
								flexGrow: 1,
								flexShrink: 1,
								...textVariants.defaults,
								color: colors["text"],
							},
						]}
					/>

					{RighComponent && (
						<Box justifyContent="center" alignItems="center">
							{RighComponent}
						</Box>
					)}
				</AnimatedBox>
				{errorMessage && (
					<Box position="absolute" top={absoluteTopSpacing}>
						<Text variant="text10" color="error" ml="s10">
							{errorMessage}
						</Text>
					</Box>
				)}
			</Pressable>
		</Box>
	)
}
