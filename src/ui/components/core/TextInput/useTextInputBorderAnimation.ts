import { useEffect } from "react";

import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ThemeColor, useAppTheme } from "@theme";

export function useTextInputBorderAnimation(
  isFocused: boolean,
  borderColor: ThemeColor,
  borderColorOnFocus: ThemeColor,
) {
  const { colors } = useAppTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, {
      duration: 300,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors[borderColor], colors[borderColorOnFocus]],
    ),
  }));
}
