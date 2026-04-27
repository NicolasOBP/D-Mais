import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { useAppTheme } from "@theme";

import { Text } from "@core-components";

import theme from "../../theme/theme";

import { toastVariants } from "./toastVariants";
import { useToast } from "./useToast";

export function Toast() {
  const { colors } = useAppTheme();
  const { toast, closeToast } = useToast();
  const progress = useSharedValue(-30);

  const isToastOpen = !!toast.message;

  const toastVariant = toastVariants[toast.type];

  const toastEnterAnimation = useAnimatedStyle(() => ({
    top: progress.value,
    backgroundColor: colors[toastVariant.backgroundColor],
    borderColor: colors[toastVariant.borderColor],
  }));

  const handleCloseToast = () => {
    progress.value = withTiming(-30, { easing: Easing.exp }, (finish) => {
      if (finish) {
        scheduleOnRN(closeToast);
      }
    });
  };

  useEffect(() => {
    if (isToastOpen) {
      progress.value = withSequence(
        withTiming(10, {
          duration: 1000,
          easing: Easing.elastic(1.8),
        }),
        withDelay(
          toast.duration!,
          withTiming(-30, { easing: Easing.exp }, (finish) => {
            if (finish) {
              scheduleOnRN(closeToast);
            }
          }),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToastOpen]);

  if (!isToastOpen) {
    return null;
  }

  return (
    <Animated.View style={[styles.toastContainer, toastEnterAnimation]}>
      <Pressable onPress={handleCloseToast} hitSlop={7}>
        <Text
          color={toastVariant.textColor}
          variant="text16Bold"
          textAlign="center"
        >
          {toast.message}
        </Text>
        {toast.description && (
          <Text color={toastVariant.textColor} variant="text14">
            {toast.description}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    minWidth: 150,
    borderRadius: theme.borderRadii.default,
    padding: theme.spacing.s8,
    borderWidth: 2,
  },
});
