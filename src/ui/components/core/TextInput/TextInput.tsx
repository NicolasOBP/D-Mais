import { useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import {
  AnimatedStyle,
  createAnimatedComponent,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

import { Box, BoxProps } from "../Box/Box";
import { Text } from "../Text/Text";

import { textInputVariant, TextInputVariant } from "./TextInputVariant";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  RighComponent?: React.ReactElement;
  LeftComponent?: React.ReactElement;
  boxProps?: BoxProps;
  variant?: TextInputVariant;
  onLayout?: (e: LayoutChangeEvent) => void;
  animatedStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

const AnimatedBox = createAnimatedComponent(Box);

export function TextInput({
  boxProps,
  label,
  errorMessage,
  RighComponent,
  LeftComponent,
  variant = "primary",
  onLayout,
  animatedStyle,
  ...textInputProps
}: TextInputProps) {
  const [absoluteTopSpacing, setAbsoluteTopSpacing] = useState(0);
  const { textVariants, colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const inputVariant = textInputVariant[variant];

  const focusInput = () => {
    inputRef.current?.focus();
  };
  return (
    <Box flexGrow={1} flexShrink={1} onLayout={onLayout}>
      <Pressable
        onPress={focusInput}
        onLayout={(e) => setAbsoluteTopSpacing(e.nativeEvent.layout.height)}
      >
        {label && (
          <Text variant="title12" mb="s4">
            {label}
          </Text>
        )}

        <AnimatedBox
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap="s8"
          {...boxProps}
          {...inputVariant}
          style={animatedStyle}
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
              {
                padding: 0,
                margin: 0,
                flexGrow: 1,
                flexShrink: 1,
              },
              textInputProps.style,
              textVariants.defaults,
            ]}
          />

          {RighComponent && (
            <Box justifyContent="center" alignItems="center">
              {RighComponent}
            </Box>
          )}
        </AnimatedBox>
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
