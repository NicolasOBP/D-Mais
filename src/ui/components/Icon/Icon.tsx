import { Pressable, ViewStyle } from "react-native";

import { ThemeColor, useAppTheme } from "@theme";

import { IconNames, iconRegistry } from "./IconRegistry";

export interface IconBase {
  size?: number;
  color?: string;
  fillColor?: string;
}

export interface IconProps {
  name: IconNames;
  color?: ThemeColor;
  fillColor?: ThemeColor;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Icon({
  name,
  color = "backgroundContrast",
  fillColor = "transparent",
  onPress,
  size,
  style,
}: IconProps) {
  const SVGIcon = iconRegistry[name];
  const { colors } = useAppTheme();

  const iconProps: React.ComponentProps<typeof SVGIcon> = {
    color: colors[color],
    fillColor: colors[fillColor],
    size,
  };

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={10} style={style}>
        <SVGIcon {...iconProps} />
      </Pressable>
    );
  }

  return <SVGIcon {...iconProps} />;
}
