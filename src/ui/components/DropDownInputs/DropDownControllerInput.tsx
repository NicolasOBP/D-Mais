import { useState } from "react"

import { Controller, type FieldValues } from "react-hook-form"

import { useFormUtils } from "@utils"

import { Box, DropDown, type DropDownProps, TextInput, type TextInputProps } from "@core-components"

import type { ControllerProps } from "../Form"

import { ArrowIconAnimation } from "./ArrowIconAnimation"
import { useDropDownInputAnimation } from "./useDropDownInputAnimation"
import { useDropDownTextInput } from "./useDropDownTextInput"

type DropDownTextInputProps<FormType extends FieldValues, TValue> = Omit<
	TextInputProps,
	"RighComponent" | "errorMessage"
> &
	ControllerProps<FormType> & {
		dropDownProps: Pick<
			DropDownProps<TValue>,
			"dropdownItems" | "valueKey" | "idKey" | "showTextWithId" | "maxHeight" | "isLoading"
		>
	}

export function DropDownControllerInput<FormType extends FieldValues, TValue>({
	control,
	name,
	rules,
	variant = "primary",
	readOnly,
	dropDownProps,
	...textInputProps
}: DropDownTextInputProps<FormType, TValue>) {
	const [wasSelected, setWasSelected] = useState(false)
	const {
		bodyProgress,
		closeDropdown,
		openDropdown,
		progress,
		setTopOffset,
		topOffset,
		isOpen,
		textValueFormatting,
	} = useDropDownTextInput()

	const animatedStyle = useDropDownInputAnimation(progress)

	//TODO: add focus function to textInput when pressing arrow icon
	return (
		<Box>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ fieldState, field }) => {
					const textValue = textValueFormatting({
						field,
						idKey: dropDownProps.idKey,
						showTextWithId: !!dropDownProps.showTextWithId,
						valueKey: dropDownProps.valueKey,
					})

					function handleChangeText(text: string) {
						if (wasSelected) {
							field.onChange("")
							setWasSelected(false)
							return
						}

						field.onChange(text)
					}

					return (
						<>
							<TextInput
								variant={variant}
								value={textValue}
								onChangeText={handleChangeText}
								errorMessage={useFormUtils.getFirstErrorMessage(fieldState.error)}
								RighComponent={
									<ArrowIconAnimation
										closeDropdown={readOnly ? () => {} : closeDropdown}
										isOpen={isOpen}
										openDropdown={readOnly ? () => {} : openDropdown}
										progress={progress}
										color={readOnly ? "gray2" : undefined}
									/>
								}
								onLayout={(e) => {
									setTopOffset(e.nativeEvent.layout.height)
								}}
								animatedStyle={animatedStyle}
								onFocus={openDropdown}
								onBlur={closeDropdown}
								readOnly={readOnly}
								{...textInputProps}
							/>
							<DropDown
								progress={bodyProgress}
								topOffset={topOffset}
								onSelectItem={(item) => {
									field.onChange(item)
									setWasSelected(true)
								}}
								closeDropdown={closeDropdown}
								searchText={field.value}
								variant={variant}
								{...dropDownProps}
							/>
						</>
					)
				}}
			/>
		</Box>
	)
}
