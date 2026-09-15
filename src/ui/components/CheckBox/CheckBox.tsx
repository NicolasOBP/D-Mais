import { Pressable } from "react-native"

import { Box, type BoxProps } from "@core-components"

import { Icon } from "../Icon"

import { type CheckBoxVariants, checkBoxVariant } from "./CheckBoxVariants"

type Props = {
	handleSelectChange: () => void
	selected: boolean
	variant?: CheckBoxVariants
	size?: number
}

export function CheckBox({ handleSelectChange, selected, variant = "squarcle", size = 24 }: Props) {
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
		<Pressable onPress={handleSelectChange}>
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
