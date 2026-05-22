/* eslint-disable import/named */
import { useState } from "react";
import { Pressable, ScrollView } from "react-native";

import { Controller, FieldValues } from "react-hook-form";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

import { Box, Text, TextInput, TextInputProps } from "@core-components";

import { ControllerProps } from "../Form";

import { ArrowIcon } from "./ArrowIcon";

export function DropDownTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  variant,
  ...textInputProps
}: Omit<TextInputProps, "RighComponent"> & ControllerProps<FormType>) {
  const { colors, borderRadii } = useAppTheme();
  const [selectedValue, setSelectedValue] = useState("Selecione");

  const isOpen = useSharedValue(false);
  const progress = useSharedValue(0); // 0 => 1
  const bodyProgress = useSharedValue(0); // 0 => 1
  const [topOffset, setTopOffset] = useState(0);

  function openDropdown() {
    isOpen.value = true;
    progress.value = withTiming(1, {
      duration: 800,
      easing: Easing.linear,
    });
    bodyProgress.value = withTiming(1, {
      duration: 800,
      easing: Easing.bounce,
    });
  }

  function closeDropdown() {
    isOpen.value = false;
    progress.value = withTiming(0, {
      duration: 800,
      easing: Easing.linear,
    });
    bodyProgress.value = withTiming(0, {
      duration: 800,
      easing: Easing.exp,
    });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.gray4, colors.gray3],
    ),
    borderBottomLeftRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.inputField, 0],
    ),
    borderBottomRightRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.inputField, 0],
    ),
    borderBottomWidth: interpolate(progress.value, [0, 1], [1, 2]),
  }));

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ fieldState, field }) => (
          <>
            <TextInput
              variant={variant}
              value={selectedValue}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              RighComponent={<ArrowIcon progress={progress} />}
              onLayout={(e) => {
                setTopOffset(e.nativeEvent.layout.height);
              }}
              animatedStyle={animatedStyle}
              onFocus={openDropdown}
              onBlur={closeDropdown}
              {...textInputProps}
            />
            <DropDown
              bodyProgress={bodyProgress}
              progress={progress}
              topOffset={topOffset}
              onSelectItem={field.onChange}
              setSelectedValue={setSelectedValue}
              closeDropdown={closeDropdown}
            />
          </>
        )}
      />
    </Box>
  );
}

function DropDown({
  bodyProgress,
  progress,
  topOffset,
  onSelectItem,
  setSelectedValue,
  closeDropdown,
}: {
  progress: SharedValue<number>;
  bodyProgress: SharedValue<number>;
  topOffset: number;
  onSelectItem: (value: string) => void;
  setSelectedValue: (value: string) => void;
  closeDropdown: () => void;
}) {
  const { borderRadii, colors } = useAppTheme();
  const height = useSharedValue(0);

  let diffColors = true;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1,
    height: interpolate(bodyProgress.value, [0, 1], [0, height.value]),
    borderTopLeftRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.inputField, 0],
    ),
    borderTopRightRadius: interpolate(
      progress.value,
      [0, 1],
      [borderRadii.inputField, 0],
    ),
    borderBottomLeftRadius: interpolate(
      progress.value,
      [0, 1],
      [0, borderRadii.inputField],
    ),
    borderBottomRightRadius: interpolate(
      progress.value,
      [0, 1],
      [0, borderRadii.inputField],
    ),
    borderWidth: interpolate(progress.value, [0, 1], [0, 1]),
    zIndex: 6,
    borderColor: colors.primary,
  }));

  return (
    <Box position="absolute" top={topOffset} style={{ width: "100%" }}>
      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        <Box
          position="absolute"
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={{ width: "100%" }}
        >
          <ScrollView
            style={{ flex: 1, maxHeight: 100 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            {dropdownItens.map((item) => {
              diffColors = !diffColors;

              return (
                <Box
                  key={item}
                  flex={1}
                  bg={diffColors ? "gray3" : "gray4"}
                  paddingHorizontal="s8"
                  paddingVertical="s4"
                >
                  <Pressable
                    onPress={() => {
                      onSelectItem(item);
                      setSelectedValue(item);
                      closeDropdown();
                    }}
                  >
                    <Text variant="text14">{item}</Text>
                  </Pressable>
                </Box>
              );
            })}
          </ScrollView>
        </Box>
      </Animated.View>
    </Box>
  );
}

const dropdownItens = [
  "DROPDOWN 1",
  "DROPDOWN 2",
  "DROPDOWN 3",
  "DROPDOWN 4",
  "DROPDOWN 5",
  "DROPDOWN 6",
];
