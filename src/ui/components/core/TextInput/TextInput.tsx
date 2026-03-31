import { useRef } from "react";
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
  boxProps?: BoxProps;
}

export function TextInput({
  boxProps,
  label,
  errorMessage,
  RighComponent,
  ...textInputProps
}: TextInputProps) {
  const { textVariants, colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };
  return (
    <Box flexGrow={1} flexShrink={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text variant="title12" mb="s4">
            {label}
          </Text>
        )}

        <Box
          flexDirection="row"
          justifyContent="space-between"
          flexGrow={1}
          flexShrink={1}
          alignItems="center"
          gap="s8"
        >
          <RNTextInput
            ref={inputRef}
            autoCapitalize="none"
            style={[
              textVariants.defaults,
              { padding: 0, margin: 0, flexGrow: 1, flexShrink: 1 },
            ]}
            placeholderTextColor={colors.gray2}
            {...textInputProps}
          />

          {RighComponent && (
            <Box justifyContent="center" alignItems="center">
              {RighComponent}
            </Box>
          )}
        </Box>
      </Pressable>
    </Box>
  );
}
