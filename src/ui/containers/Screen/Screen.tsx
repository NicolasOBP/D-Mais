import { PropsWithChildren } from "react";
import { Keyboard, Pressable, ScrollView } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box, BoxProps } from "@core-components";

export function Screen({
  children,
  scrollable = false,
  ...boxProps
}: PropsWithChildren & BoxProps & { scrollable?: boolean }) {
  const { top } = useSafeAreaInsets();

  function hideKeyboard() {
    Keyboard.dismiss();
  }

  const Container = scrollable ? ScrollView : Box;
  return (
    <Container
      flex={1}
      backgroundColor="background"
      paddingHorizontal="default"
      style={{ paddingTop: top }}
      {...boxProps}
    >
      <Pressable style={{ flex: 1 }} onPress={hideKeyboard}>
        {children}
      </Pressable>
    </Container>
  );
}
