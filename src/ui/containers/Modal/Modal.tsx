import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";

import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useHideKeyboard } from "@utils";

import { Box } from "@core-components";

import { ModalFooter } from "./components/ModalFooter";
import { ModalHeader } from "./components/ModalHeader";
import { useModal } from "./useModal";
import { useModalAnimations } from "./useModalAnimations";

const DURATION = 600;

export function Modal() {
  const { modal } = useModal();
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
        onPress={useHideKeyboard}
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
            {modal.HeaderComponent ? (
              modal.HeaderComponent
            ) : (
              <ModalHeader title={modal.headerTitle} />
            )}

            {modal.BodyComponent}

            {modal.footerButton ? (
              <ModalFooter {...modal.footerButton} />
            ) : (
              modal.FooterComponent
            )}
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
