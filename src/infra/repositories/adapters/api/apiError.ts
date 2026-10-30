import axios from "axios"

import { errorUtils } from "@utils"

type ApiErrorContext = {
	/** Message used when the server response contains a non-OK STATUS. */
	fallbackServerMessage: string
	/** Message shown when the request could not reach the server. */
	connectionErrorMessage: string
	/** Message used for an HTTP response that has no usable business error. */
	httpErrorMessage: (status: number) => string
	/** Optional parser for endpoints whose error result has a special format. */
	getServerErrorMessage?: (responseData: unknown) => string | undefined
	translateServerErrorMessage?: boolean
	/** Context attached when the shared error utility translates the Axios message. */
	translatedErrorCause: (status?: number) => string
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null
}

function getFirstResult(responseData: unknown): unknown {
	if (!isRecord(responseData) || !Array.isArray(responseData.result)) {
		return undefined
	}

	return responseData.result[0]
}

function getDefaultServerErrorMessage(
	responseData: unknown,
	fallbackMessage: string,
): string | undefined {
	const result = getFirstResult(responseData)

	if (!isRecord(result) || typeof result.STATUS !== "string" || result.STATUS === "OK") {
		return undefined
	}

	return typeof result.MENSAGEM === "string" && result.MENSAGEM.trim()
		? result.MENSAGEM
		: fallbackMessage
}

/** Converts transport errors into the messages expected by the application. */
export function handleApiError(error: unknown, context: ApiErrorContext): never {
	if (!axios.isAxiosError(error)) {
		throw error
	}

	const translatedMessage = errorUtils.getErrorMessage(error.message)
	if (translatedMessage !== error.message) {
		throw new Error(translatedMessage, {
			cause: context.translatedErrorCause(error.response?.status),
		})
	}

	const serverErrorMessage = context.getServerErrorMessage
		? context.getServerErrorMessage(error.response?.data)
		: getDefaultServerErrorMessage(error.response?.data, context.fallbackServerMessage)

	if (serverErrorMessage) {
		const message = context.translateServerErrorMessage
			? errorUtils.getErrorMessage(serverErrorMessage)
			: serverErrorMessage
		throw new Error(message || context.fallbackServerMessage)
	}

	if (error.response) {
		throw new Error(context.httpErrorMessage(error.response.status), {
			cause: error.message,
		})
	}

	throw new Error(context.connectionErrorMessage, {
		cause: error.message,
	})
}
