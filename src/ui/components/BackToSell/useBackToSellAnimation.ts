import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

export function useBackToSellAnimation(progress: SharedValue<number>) {
  const { spacing, borderRadii, colors } = useAppTheme();

  return useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [spacing.s62, -37]),
      },
    ],
    opacity: 0.9,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: borderRadii.default,
    borderBottomLeftRadius: borderRadii.default,
  }));
}
