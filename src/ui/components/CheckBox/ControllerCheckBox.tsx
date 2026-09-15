import { Controller, type FieldValues } from "react-hook-form"

import type { ControllerProps } from "../Form"

import { CheckBox } from "./CheckBox"
import type { CheckBoxVariants } from "./CheckBoxVariants"

type Props<FormType extends FieldValues> = ControllerProps<FormType> & {
	variant?: CheckBoxVariants
	size?: number
}

export function ControllerCheckBox<FormType extends FieldValues>({
	control,
	name,
	rules,
	variant,
	size,
}: Props<FormType>) {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field }) => (
				<CheckBox
					selected={field.value}
					handleSelectChange={() => field.onChange(!field.value)}
					variant={variant}
					size={size}
				/>
			)}
		/>
	)
}
