import { PropsWithChildren } from "react";
import { Pressable, ScrollView, View, ViewStyle } from "react-native";

import { useAppTheme } from "@theme";
import { useHideKeyboard } from "@utils";

export function Screen({
  children,
  scrollable = false,
  ...viewProps
}: PropsWithChildren<ViewStyle> & { scrollable?: boolean }) {
  const { colors, spacing } = useAppTheme();

  const Container = scrollable ? ScrollView : View;

  return (
    <Container
      {...viewProps}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.default,
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={useHideKeyboard}>
        {children}
      </Pressable>
    </Container>
  );
}
