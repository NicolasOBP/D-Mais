type ErrorWithMessage = {
	message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof (error as Record<string, unknown>).message === "string"
	)
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) {
		return maybeError
	}

	try {
		return new Error(JSON.stringify(maybeError))
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError))
	}
}

function getErrorMessage(error: unknown): string {
	const message = toErrorWithMessage(error).message

	const normalizedMessage = message ? message.normalize("NFC") : ""
	const regex = ErrorAux.clientCredit.causeRegEx!
	const match = normalizedMessage.match(regex)

	if (match) {
		const limitValue = match[1]

		return ErrorAux.clientCredit.messageFn?.(limitValue) ?? ""
	}

	return message.includes(ErrorAux.offline.cause!)
		? (ErrorAux.offline.message ?? "")
		: message.includes(ErrorAux.serverError.cause!)
			? (ErrorAux.serverError.message ?? "")
			: (message ?? "")
}

export const errorUtils = { getErrorMessage }

type ErrorTypes = "offline" | "serverError" | "clientCredit"
const ErrorAux: Record<
	ErrorTypes,
	{ cause?: string; causeRegEx?: RegExp; message?: string; messageFn?: (value: string) => string }
> = {
	clientCredit: {
		causeRegEx: /cliente sem limite de crédito.*?limite:\s*(R\$\s*[\d.,]+)/i,
		messageFn(value) {
			return `Cliente sem limite de crédito. O limite atual é de ${value}.\nTroque a forma de pagamento para dinheiro para concluir a compra.`
		},
	},
	offline: {
		cause: "404",
		message: "Servidor Offline",
	},
	serverError: {
		cause: "502",
		message: "Erro no Servidor",
	},
}
