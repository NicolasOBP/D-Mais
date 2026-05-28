/* eslint-disable import/named */

import { Controller, FieldValues } from "react-hook-form";

import {
  Box,
  DropDown,
  DropDownProps,
  TextInput,
  TextInputProps,
} from "@core-components";

import { ControllerProps } from "../Form";

import { ArrowIconAnimation } from "./ArrowIconAnimation";
import { useDropDownInputAnimation } from "./useDropDownInputAnimation";
import { useDropDownTextInput } from "./useDropDownTextInput";

type DropDownTextInputProps<
  FormType extends FieldValues,
  TValue extends any[],
> = Omit<TextInputProps, "RighComponent"> &
  ControllerProps<FormType> &
  Pick<DropDownProps<TValue>, "dropdownItems" | "valueKey" | "idKey">;

export function DropDownTextInput<
  FormType extends FieldValues,
  TValue extends any[],
>({
  control,
  name,
  rules,
  variant,
  dropdownItems,
  valueKey,
  idKey,
  ...textInputProps
}: DropDownTextInputProps<FormType, TValue>) {
  // const [selectedValue, setSelectedValue] = useState<TValue>();

  const {
    bodyProgress,
    closeDropdown,
    openDropdown,
    progress,
    setTopOffset,
    topOffset,
    isOpen,
  } = useDropDownTextInput();

  const animatedStyle = useDropDownInputAnimation(progress);

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
              value={field.value[valueKey]}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              RighComponent={
                <ArrowIconAnimation
                  closeDropdown={closeDropdown}
                  isOpen={isOpen}
                  openDropdown={openDropdown}
                  progress={progress}
                />
              }
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
              closeDropdown={closeDropdown}
              valueKey={valueKey}
              idKey={idKey}
              dropdownItems={dropdownItems}
            />
          </>
        )}
      />
    </Box>
  );
}
