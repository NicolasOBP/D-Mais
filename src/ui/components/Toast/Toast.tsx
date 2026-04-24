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

import { Text } from "@core-components";

import theme from "../../theme/theme";

import { useToast } from "./useToast";

export function Toast() {
  const { toast, closeToast } = useToast();
  const progress = useSharedValue(-30);

  const isToastOpen = !!toast.message;

  const toastEnterAnimation = useAnimatedStyle(() => ({
    top: progress.value,
  }));

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
  }, [isToastOpen]);

  if (!isToastOpen) {
    return null;
  }

  return (
    <Animated.View style={[styles.toastContainer, toastEnterAnimation]}>
      <Pressable onPress={closeToast}>
        <Text>{toast.message}</Text>
        {toast.description && <Text variant="text14">{toast.description}</Text>}
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
    backgroundColor: theme.colors.carrot,
    padding: theme.spacing.s8,
  },
});
