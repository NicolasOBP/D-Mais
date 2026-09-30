import { Pressable } from "react-native"

import type { ThemeColor } from "@theme"

import { Icon } from "../../Icon"
import { Box, type BoxProps } from "../Box"

import { type CheckBoxVariants, checkBoxVariant } from "./CheckBoxVariants"

export type CheckBoxProps = {
	handleSelectChange: () => void
	selected: boolean
	variant?: CheckBoxVariants
	size?: number
	disabled?: boolean
	readOnly?: boolean
}

export function CheckBox({
	handleSelectChange,
	selected,
	variant = "squarcle",
	size = 24,
	disabled = false,
	readOnly,
}: CheckBoxProps) {
	const checkBoxStyle = checkBoxVariant[variant]

	const borderColors: ThemeColor =
		variant === "squarcle" ? (selected ? "primary" : "gray2") : readOnly ? "gray2" : "primary"
	const backgroundColors: ThemeColor =
		variant === "squarcle" ? (selected ? "primary" : "background") : "transparent"

	function checkStyle() {
		if (variant === "squarcle" && selected) {
			return <Icon name="check" color="background" />
		}
		if (variant === "rounded" && selected) {
			return (
				<Box
					backgroundColor={readOnly ? "gray2" : "primary"}
					borderRadius="rounded"
					width={size - 10}
					height={size - 10}
				/>
			)
		}
	}

	return (
		<Pressable onPress={handleSelectChange} disabled={disabled}>
			<Box
				{...containerBoxStyle}
				width={size}
				height={size}
				borderColor={borderColors}
				backgroundColor={backgroundColors}
				{...checkBoxStyle}
			>
				{checkStyle()}
			</Box>
		</Pressable>
	)
}

const containerBoxStyle: BoxProps = {
	justifyContent: "center",
	alignItems: "center",
}
