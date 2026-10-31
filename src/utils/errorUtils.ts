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

	return new Error(String(maybeError))
}

function getErrorMessage(error: unknown): string {
	const message = toErrorWithMessage(error).message

	const normalizedMessage = message ? message.normalize("NFC") : ""
	const match = normalizedMessage.match(ErrorAux.clientCredit.causeRegEx!)

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

export type OrderSendErrorAction = "both" | "backToSell" | "sendToPending"

const orderSendErrorCategories: Record<OrderSendErrorAction, readonly string[]> = {
	both: ["Cliente sem limite de crédito"],
	backToSell: ["Produtos com bases diferentes detectadas"],
	sendToPending: [],
}

function getOrderSendErrorAction(errorMessage: string): OrderSendErrorAction {
	const normalizedMessage = errorMessage.normalize("NFC").toLowerCase()

	for (const action of ["both", "backToSell", "sendToPending"] as const) {
		const matchesCategory = orderSendErrorCategories[action].some((cause) =>
			normalizedMessage.includes(cause.normalize("NFC").toLowerCase()),
		)

		if (matchesCategory) return action
	}

	return "sendToPending"
}

export const errorUtils = { getErrorMessage, getOrderSendErrorAction }

type ErrorTypes = "offline" | "serverError" | "clientCredit"
export const ErrorAux: Record<
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
