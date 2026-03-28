import { useRef } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

import { useAppTheme } from "@theme";

import { Box, BoxProps } from "./Box";
import { PressableBox } from "./PressableBox";
import { Text } from "./Text";

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
    <PressableBox onPress={focusInput} {...boxProps}>
      {label && (
        <Text variant="title12" mb="s4">
          {label}
        </Text>
      )}

      <RNTextInput
        ref={inputRef}
        autoCapitalize="none"
        style={[textVariants.defaults, { padding: 0, margin: 0 }]}
        placeholderTextColor={colors.gray2}
        {...textInputProps}
      />

      {RighComponent && <Box justifyContent="center">{RighComponent}</Box>}
    </PressableBox>
  );
}
