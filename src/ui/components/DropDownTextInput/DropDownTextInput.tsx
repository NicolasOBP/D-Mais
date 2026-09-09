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
	"RighComponent"
> &
	ControllerProps<FormType> &
	Pick<DropDownProps<TValue>, "dropdownItems" | "valueKey" | "idKey" | "showTextWithId">

export function DropDownTextInput<FormType extends FieldValues, TValue>({
	control,
	name,
	rules,
	variant = "primary",
	dropdownItems,
	valueKey,
	idKey,
	showTextWithId = false,
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
						valueKey,
						field,
						idKey,
						showTextWithId,
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
										closeDropdown={closeDropdown}
										isOpen={isOpen}
										openDropdown={openDropdown}
										progress={progress}
									/>
								}
								onLayout={(e) => {
									setTopOffset(e.nativeEvent.layout.height)
								}}
								animatedStyle={animatedStyle}
								onFocus={openDropdown}
								onBlur={closeDropdown}
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
								valueKey={valueKey}
								idKey={idKey}
								dropdownItems={dropdownItems}
								searchText={field.value}
								variant={variant}
								showTextWithId={showTextWithId}
							/>
						</>
					)
				}}
			/>
		</Box>
	)
}
