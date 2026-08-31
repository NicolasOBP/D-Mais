import { Controller, type FieldValues, type UseControllerProps } from "react-hook-form"

import { TextInput, type TextInputProps } from "@core-components"

import { PasswordInput } from "../PasswordInput"

export type ControllerProps<FormType extends FieldValues> = UseControllerProps<FormType>

export function FormTextInput<FormType extends FieldValues>({
	control,
	name,
	rules,
	isPassword,
	variant,
	...textInputProps
}: TextInputProps & ControllerProps<FormType> & { isPassword?: boolean }) {
	const InputType = isPassword ? PasswordInput : TextInput
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ fieldState, field }) => (
				<InputType
					variant={variant}
					value={field.value}
					onChangeText={field.onChange}
					errorMessage={fieldState.error?.message}
					{...textInputProps}
				/>
			)}
		/>
	)
}
