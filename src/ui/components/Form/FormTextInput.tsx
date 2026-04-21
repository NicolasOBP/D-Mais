import React from "react";

// eslint-disable-next-line import/named
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import { TextInput, TextInputProps } from "@core-components";

import { PasswordInput } from "../PasswordInput";

export type ControllerProps<FormType extends FieldValues> =
  UseControllerProps<FormType>;

export function FormTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  isPassword,
  ...textInputProps
}: TextInputProps & ControllerProps<FormType> & { isPassword?: boolean }) {
  const InputType = isPassword ? PasswordInput : TextInput;
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ fieldState, field }) => (
        <InputType
          value={field.value}
          onChangeText={field.onChange}
          errorMessage={fieldState.error?.message}
          {...textInputProps}
        />
      )}
    />
  );
}
