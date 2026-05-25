/* eslint-disable import/named */
import { useState } from "react";

import { Controller, FieldValues } from "react-hook-form";
import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useAppTheme } from "@theme";

import { Box, DropDown, TextInput, TextInputProps } from "@core-components";

import { ControllerProps } from "../Form";

import { ArrowIconAnimation } from "./ArrowIconAnimation";
import { useDropDownTextInput } from "./useDropDownTextInput";

export function DropDownTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  variant,
  ...textInputProps
}: Omit<TextInputProps, "RighComponent"> & ControllerProps<FormType>) {
  const { colors, borderRadii } = useAppTheme();
  const [selectedValue, setSelectedValue] = useState("Selecione");

  const {
    bodyProgress,
    closeDropdown,
    openDropdown,
    progress,
    setTopOffset,
    topOffset,
  } = useDropDownTextInput();

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
              RighComponent={<ArrowIconAnimation progress={progress} />}
              onLayout={(e) => {
                setTopOffset(e.nativeEvent.layout.height);
              }}
              animatedStyle={animatedStyle}
              onFocus={openDropdown}
              onBlur={closeDropdown}
              {...textInputProps}
            />
            <DropDown
              progress={bodyProgress}
              topOffset={topOffset}
              onSelectItem={field.onChange}
              setSelectedValue={setSelectedValue}
              closeDropdown={closeDropdown}
              items={dropdownItens}
            />
          </>
        )}
      />
    </Box>
  );
}

const dropdownItens = [
  { value: "DROPDOWN 1" },
  { value: "DROPDOWN 2" },
  { value: "DROPDOWN 3" },
  { value: "DROPDOWN 4" },
  { value: "DROPDOWN 5" },
  { value: "DROPDOWN 6" },
  { value: "DROPDOWN 7" },
];
