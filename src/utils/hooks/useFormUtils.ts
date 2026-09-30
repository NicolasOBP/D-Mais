/** biome-ignore-all lint/suspicious/noExplicitAny: <intended bahavior> */
import type { FormState } from "react-hook-form"

function isFormValid<T extends Record<string, any>>(formState: FormState<T>): boolean {
	const hasErrorMessage = (obj: any): boolean => {
		if (!obj || typeof obj !== "object") return false

		if ("message" in obj && typeof obj.message === "string") {
			return true
		}

		return Object.values(obj).some((value) => hasErrorMessage(value))
	}

	return hasErrorMessage(formState.errors)
}

function getFirstErrorMessage(errorObj: any): string | undefined {
	if (!errorObj) return undefined

	if (typeof errorObj.message === "string") {
		return errorObj.message
	}

	for (const key in errorObj) {
		if (Object.hasOwn(errorObj, key)) {
			const result = getFirstErrorMessage(errorObj[key])
			if (result) return result
		}
	}

	return undefined
}

export const useFormUtils = {
	isFormValid,
	getFirstErrorMessage,
}
