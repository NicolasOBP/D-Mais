import { useRef, useState } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

import { useAppTheme } from "@theme";

import { Box, BoxProps } from "../Box/Box";
import { Text } from "../Text/Text";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  RighComponent?: React.ReactElement;
  LeftComponent?: React.ReactElement;
  boxProps?: BoxProps;
}

export function TextInput({
  boxProps,
  label,
  errorMessage,
  RighComponent,
  LeftComponent,
  ...textInputProps
}: TextInputProps) {
  const [absoluteTopSpacing, setAbsoluteTopSpacing] = useState(0);
  const { textVariants, colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };
  return (
    <Box flexGrow={1} flexShrink={1}>
      <Pressable onPress={focusInput} hitSlop={10}>
        {label && (
          <Text variant="title12" mb="s4">
            {label}
          </Text>
        )}

        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap="s8"
          {...boxProps}
          onLayout={(e) => setAbsoluteTopSpacing(e.nativeEvent.layout.height)}
        >
          {LeftComponent && (
            <Box justifyContent="center" alignItems="center">
              {LeftComponent}
            </Box>
          )}

          <RNTextInput
            ref={inputRef}
            autoCapitalize="none"
            placeholderTextColor={colors.gray2}
            {...textInputProps}
            style={[
              textVariants.defaults,
              { padding: 0, margin: 0, flexGrow: 1, flexShrink: 1 },
              textInputProps.style,
            ]}
          />

          {RighComponent && (
            <Box justifyContent="center" alignItems="center">
              {RighComponent}
            </Box>
          )}
        </Box>
        {errorMessage && (
          <Box position="absolute" top={absoluteTopSpacing}>
            <Text variant="text10" color="error" ml="s10">
              {errorMessage}
            </Text>
          </Box>
        )}
      </Pressable>
    </Box>
  );
}
