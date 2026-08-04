import { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";

import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";
import { useHideKeyboard } from "@utils";

import { Box } from "@core-components";

import { ModalFooter } from "./components/ModalFooter";
import { ModalHeader } from "./components/ModalHeader";
import { useModal } from "./useModal";
import { useModalAnimations } from "./useModalAnimations";
import { validateModalState } from "./useModalError";

const DURATION = 1000;
const WIDTH_SCREEN = Dimensions.get("screen").width;

export function Modal() {
  const { spacing } = useAppTheme();
  const { modal } = useModal();
  const modalOpen = useSharedValue(false);
  const modalHeight = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(Number(!modalOpen.value), { duration: DURATION }),
  );
  const widthValue = WIDTH_SCREEN - spacing.s16 * 2;

  const { backdropAnimatedStyle, modalAnimatedStyle } = useModalAnimations({
    DURATION,
    modalOpen,
    progress,
    height: modalHeight,
  });

  useEffect(() => {
    if (modal.isModalOpen || modalOpen.value) {
      validateModalState(modal);

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
            width={widthValue}
            gap="s24"
            onLayout={(e) => {
              const heitgh = e.nativeEvent.layout.height;

              if (heitgh >= modalHeight.value) {
                modalHeight.value = heitgh;
              }
            }}
          >
            {modal.HeaderComponent ? (
              modal.HeaderComponent
            ) : (
              <ModalHeader
                title={modal.headerTitle}
                subtitle={modal.headerSubtitle}
              />
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
