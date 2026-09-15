import type { BoxProps } from "@core-components"

export type CheckBoxVariants = "squarcle" | "rounded"

export const checkBoxVariant: Record<CheckBoxVariants, BoxProps> = {
	rounded: {
		borderRadius: "rounded",
		borderWidth: 3,
		borderColor: "primary",
		backgroundColor: "transparent",
	},
	squarcle: {
		borderRadius: "checkbox",
		borderWidth: 1,
	},
}
