import type { ThemeColor } from "@theme"

import type { ToastTypes } from "./useToast"

export const toastVariants: Record<
	ToastTypes,
	{
		backgroundColor: ThemeColor
		borderColor: ThemeColor
		textColor: ThemeColor
	}
> = {
	error: {
		backgroundColor: "errorLight",
		borderColor: "error",
		textColor: "darkRed",
	},
	success: {
		backgroundColor: "successLight",
		borderColor: "success",
		textColor: "darkGreen",
	},
	warning: {
		backgroundColor: "warningLight",
		borderColor: "warning",
		textColor: "darkOrange",
	},
}
