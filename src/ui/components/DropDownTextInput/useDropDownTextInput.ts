import { useState } from "react"

import type { ControllerRenderProps, FieldValues, Path, PathValue } from "react-hook-form"
import { Easing, useSharedValue, withTiming } from "react-native-reanimated"

import type { StringOrNumberKeyConstraint } from "@utils"

export function useDropDownTextInput() {
	const isOpen = useSharedValue(false)
	const progress = useSharedValue(0)
	const bodyProgress = useSharedValue(0)
	const [topOffset, setTopOffset] = useState(0)

	function openDropdown() {
		isOpen.value = true
		progress.value = withTiming(1, {
			duration: 800,
			easing: Easing.linear,
		})
		bodyProgress.value = withTiming(1, {
			duration: 800,
			easing: Easing.bounce,
		})
	}

	function closeDropdown() {
		isOpen.value = false
		progress.value = withTiming(0, {
			duration: 800,
			easing: Easing.linear,
		})
		bodyProgress.value = withTiming(0, {
			duration: 800,
			easing: Easing.exp,
		})
	}

	type Props<TValue, FormType extends FieldValues> = {
		valueKey: StringOrNumberKeyConstraint<TValue> | undefined
		idKey: StringOrNumberKeyConstraint<TValue> | undefined
		showTextWithId: boolean
		field: ControllerRenderProps<FormType, Path<FormType>>
	}

	function textValueFormatting<TValue, FormType extends FieldValues>({
		valueKey,
		field,
		idKey,
		showTextWithId,
	}: Props<TValue, FormType>): PathValue<
		FormType,
		Path<FormType>
	>[StringOrNumberKeyConstraint<TValue>] {
		let textValue: string | PathValue<FormType, Path<FormType>>[StringOrNumberKeyConstraint<TValue>]

		const isSimpleString = !valueKey || !idKey

		if (isSimpleString) {
			return field.value
		}

		if (!field.value) {
			return undefined
		}

		if (showTextWithId) {
			textValue = `${field.value[idKey]} - ${field.value[valueKey]}`
		} else {
			textValue = field.value[valueKey]
		}

		const isEmptyOrUndefined =
			String(textValue)[0] === " " || !field.value[idKey] || !field.value[valueKey]

		if (isEmptyOrUndefined) {
			return undefined
		}

		return textValue
	}

	return {
		openDropdown,
		closeDropdown,
		isOpen,
		bodyProgress,
		progress,
		topOffset,
		setTopOffset,
		textValueFormatting,
	}
}
