import { Pressable } from "react-native"

import { Icon } from "../../Icon"
import { Box, type BoxProps } from "../Box"

import { type CheckBoxVariants, checkBoxVariant } from "./CheckBoxVariants"

export type CheckBoxProps = {
	handleSelectChange: () => void
	selected: boolean
	variant?: CheckBoxVariants
	size?: number
	disabled?: boolean
}

export function CheckBox({
	handleSelectChange,
	selected,
	variant = "squarcle",
	size = 24,
	disabled = false,
}: CheckBoxProps) {
	const checkBoxStyle = checkBoxVariant[variant]

	function checkStyle() {
		if (variant === "squarcle" && selected) {
			return <Icon name="check" color="background" />
		}
		if (variant === "rounded" && selected) {
			return (
				<Box
					backgroundColor="primary"
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
				borderColor={selected ? "primary" : "gray2"}
				backgroundColor={selected ? "primary" : "background"}
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
