import { Dimensions } from "react-native";

import {
  DerivedValue,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

type Props = {
  modalOpen: SharedValue<boolean>;
  DURATION: number;
  progress: DerivedValue<number>;
};

const WIDTH_SCREEN = Dimensions.get("screen").width;

export function useModalAnimations({ DURATION, modalOpen, progress }: Props) {
  const { spacing } = useAppTheme();
  const widthValue = WIDTH_SCREEN - spacing.s16 * 2;

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    zIndex: modalOpen.value
      ? 100
      : withDelay(DURATION, withTiming(-1, { duration: 0 })),
    opacity: 1 - progress.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [1, 0], [0, 234]),
    width: interpolate(progress.value, [1, 0], [0, widthValue]),
  }));

  return { backdropAnimatedStyle, modalAnimatedStyle };
}
