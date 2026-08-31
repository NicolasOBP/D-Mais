import { Pressable, type ViewStyle } from "react-native"

import { type ThemeColor, useAppTheme } from "@theme"

import { type IconNames, iconRegistry } from "./IconRegistry"

export interface IconBase {
	size?: number
	color?: string
	fillColor?: string
}

export interface IconProps {
	name: IconNames
	color?: ThemeColor
	fillColor?: ThemeColor
	size?: number
	onPress?: () => void
	style?: ViewStyle
	hitSlop?: number
}

export function Icon({
	name,
	color = "backgroundContrast",
	fillColor = "transparent",
	onPress,
	size,
	style,
	hitSlop = 10,
}: IconProps) {
	const SVGIcon = iconRegistry[name]
	const { colors } = useAppTheme()

	const iconProps: React.ComponentProps<typeof SVGIcon> = {
		color: colors[color],
		fillColor: colors[fillColor],
		size,
	}

	if (onPress) {
		return (
			<Pressable onPress={onPress} hitSlop={hitSlop} style={style}>
				<SVGIcon {...iconProps} />
			</Pressable>
		)
	}

	return <SVGIcon {...iconProps} />
}
