import { Pressable } from "react-native";

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
}

export function Icon({
  name,
  color = "backgroundContrast",
  fillColor = "transparent",
  onPress,
  size,
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
      <Pressable onPress={onPress} hitSlop={10}>
        <SVGIcon {...iconProps} />
      </Pressable>
    );
  }

  return <SVGIcon {...iconProps} />;
}
