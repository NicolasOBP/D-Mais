import { PropsWithChildren } from "react";
import { Keyboard, Pressable, ScrollView, View, ViewStyle } from "react-native";

import { useAppTheme } from "@theme";

export function Screen({
  children,
  scrollable = false,
  ...viewProps
}: PropsWithChildren<ViewStyle> & { scrollable?: boolean }) {
  const { colors, spacing } = useAppTheme();

  function hideKeyboard() {
    Keyboard.dismiss();
  }

  const Container = scrollable ? ScrollView : View;
  // TODO: KEYBOARDAVOIDINGVIEW
  return (
    <Container
      {...viewProps}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.default,
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={hideKeyboard}>
        {children}
      </Pressable>
    </Container>
  );
}
