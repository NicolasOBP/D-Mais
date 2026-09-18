import type { ReactNode } from "react"

import { Controller, type FieldValues } from "react-hook-form"

import { CheckBox, type CheckBoxVariants } from "@core-components"

import { PressableBox, type PressableBoxProps } from "../core"
import type { ControllerProps } from "../Form"

type Props<FormType extends FieldValues> = ControllerProps<FormType> & {
	variant?: CheckBoxVariants
	size?: number
	children?: ReactNode
	pressableProps?: Omit<PressableBoxProps, "children" | "onPress">
}

export function ControllerCheckBox<FormType extends FieldValues>({
	control,
	name,
	rules,
	variant,
	size,
	children,
	pressableProps,
}: Props<FormType>) {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field }) => {
				const toggle = () => field.onChange(!field.value)
				const checkBox = (
					<CheckBox
						selected={field.value}
						handleSelectChange={toggle}
						variant={variant}
						size={size}
						disabled={Boolean(children)}
					/>
				)

				return children ? (
					<PressableBox {...pressableProps} onPress={toggle}>
						{checkBox}
						{children}
					</PressableBox>
				) : (
					checkBox
				)
			}}
		/>
	)
}
