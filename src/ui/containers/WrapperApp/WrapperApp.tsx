import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export function WrapperApp({ children }: React.PropsWithChildren) {
  const behaviour = useBehavior();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={behaviour}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
}

/**
 * useBehavior implemented due to Android problem
 * when closing keyboard and letting an extra space
 * @returns
 */
function useBehavior() {
  const defaultValue: KeyboardAvoidingViewProps["behavior"] =
    Platform.OS === "ios" ? "padding" : "height";

  const [behaviour, setBehaviour] =
    useState<KeyboardAvoidingViewProps["behavior"]>(defaultValue);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setBehaviour(defaultValue);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setBehaviour(undefined);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return behaviour;
}
