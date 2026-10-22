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
		extraFunction?: (value: TValue) => void
		isError: boolean
		onErrorPress: () => void
	}

export function DropDownControllerInput<FormType extends FieldValues, TValue>({
	control,
	name,
	rules,
	variant = "primary",
	readOnly,
	isError,
	onErrorPress,
	extraFunction,
	dropDownProps,
	onChangeText,
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

					const errorMessage = isError
						? "Erro ao carregar lista, recarregue"
						: useFormUtils.getFirstErrorMessage(fieldState.error)

					return (
						<>
							<TextInput
								variant={variant}
								value={textValue}
								onChangeText={(text) => {
									onChangeText?.(text)
									handleChangeText(text)
								}}
								errorMessage={errorMessage}
								RighComponent={
									<ArrowIconAnimation
										isError={isError}
										onErrorPress={onErrorPress}
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
									extraFunction?.(item)
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
