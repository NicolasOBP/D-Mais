import {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

export function useDropDownInputAnimation(progress: SharedValue<number>) {
  const { borderRadii, colors } = useAppTheme();

  return useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.gray4, colors.gray3],
    ),
    borderBottomLeftRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.inputField, 0],
    ),
    borderBottomRightRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.inputField, 0],
    ),
    borderBottomWidth: interpolate(progress.value, [0, 1], [1, 2]),
  }));
}
