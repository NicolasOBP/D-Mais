import { Image } from "react-native"

import { useAppTheme } from "@theme"

export function AppLogo({
	size = 60,
	noMargin,
	noHorizontalPadding,
}: {
	size?: number
	noMargin?: boolean
	noHorizontalPadding?: boolean
}) {
	const img = require("../../../../assets/images/dmais_logo.png")
	const { spacing } = useAppTheme()

	const marginLeft = noHorizontalPadding ? -spacing.default : noMargin ? 0 : -spacing.s14

	return <Image source={img} style={{ width: size, height: size / 2, marginLeft: marginLeft }} />
}
