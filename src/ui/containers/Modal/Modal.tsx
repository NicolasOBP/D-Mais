import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { Box } from "@core-components";

import { useModal } from "./useModal";

const DURATION = 600;

export function Modal() {
  const { isModalOpen, closeModal } = useModal();

  const modalOpen = useSharedValue(false);
  const progress = useDerivedValue(() =>
    withTiming(Number(!modalOpen.value), { duration: DURATION }),
  );

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    zIndex: modalOpen.value
      ? 1
      : withDelay(DURATION, withTiming(-1, { duration: 0 })),
    opacity: 1 - progress.value,
  }));

  useEffect(() => {
    if (isModalOpen || modalOpen.value) {
      modalOpen.value = !modalOpen.value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
      <TouchableOpacity
        onPress={closeModal}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Box
          backgroundColor="carrot"
          justifyContent="center"
          alignItems="center"
          width={200}
          height={200}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
