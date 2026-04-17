import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";

import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Box } from "@core-components";

import { ModalBody } from "./components/ModalBody";
import { ModalFooter } from "./components/ModalFooter";
import { ModalHeader } from "./components/ModalHeader";
import { useModal } from "./useModal";
import { useModalAnimations } from "./useModalAnimations";

const DURATION = 600;

export function Modal() {
  const { modal, closeModal } = useModal();
  const modalOpen = useSharedValue(false);
  const progress = useDerivedValue(() =>
    withTiming(Number(!modalOpen.value), { duration: DURATION }),
  );

  const { backdropAnimatedStyle, modalAnimatedStyle } = useModalAnimations({
    DURATION,
    modalOpen,
    progress,
  });

  useEffect(() => {
    if (modal.isModalOpen || modalOpen.value) {
      modalOpen.value = !modalOpen.value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.isModalOpen]);

  return (
    <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
      <Pressable
        onPress={closeModal}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Animated.View style={modalAnimatedStyle}>
          <Box
            p="s16"
            borderRadius="default"
            backgroundColor="background"
            justifyContent="space-between"
            style={{ width: "100%", height: "100%" }}
          >
            <ModalHeader title={modal.title} />

            <ModalBody />

            <ModalFooter />
          </Box>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
