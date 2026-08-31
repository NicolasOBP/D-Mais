function toBRLCurrency(value: number | string): string {
	const numValue = typeof value === "string" ? parseFloat(value) : value

	if (Number.isNaN(numValue)) {
		return "R$ 0,00"
	}

	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(numValue)
}

function formatNumberWithThousands(value: number | string): string {
	const numValue = typeof value === "string" ? parseFloat(value) : value

	if (Number.isNaN(numValue)) {
		return "0"
	}

	return new Intl.NumberFormat("pt-BR", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(numValue)
}

export const useNumberFormat = { toBRLCurrency, formatNumberWithThousands }
