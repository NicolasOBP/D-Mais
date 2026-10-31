import type {
	AuthUser,
	Product,
	ProductAPIContent,
	ProductCartVariables,
	ProductPriceResult,
	ProductPriceResultAPI,
} from "@domain"

export function adaptFuelResultToProduct(fuel: ProductAPIContent): Product {
	return {
		id: fuel.C_CDPRO,
		title: fuel.C_DESC,
	}
}

export function adaptProductPriceRequest(authUser: AuthUser, products: ProductCartVariables[]) {
	return {
		C_POSTO: authUser.company,
		C_CDEMPR: authUser.id,
		C_ITENS: products.map((item) => ({
			C_CDPRO: item.id,
			C_CDEST: item.inventory.id,
			C_QTVEN: item.volume,
		})),
	}
}

export function parseProductPrice(value: string | number): number {
	if (typeof value === "string" && value.trim() === "") {
		throw new Error("O servidor retornou um preço inválido.")
	}

	const normalizedValue =
		typeof value === "string" && value.includes(",")
			? value.replace(/\./g, "").replace(",", ".")
			: value
	const price = Number(normalizedValue)

	if (!Number.isFinite(price)) {
		throw new Error("O servidor retornou um preço inválido.")
	}

	return price
}

export function adaptProductPriceResult(priceResult: ProductPriceResultAPI): ProductPriceResult {
	return {
		cartTotalPrice: parseProductPrice(priceResult.VALOR_TOTAL_PEDIDO),
		productItems: priceResult.ITENS.map((item) => ({
			productCode: item.C_CDPRO,
			price: parseProductPrice(item.VALOR_UNITARIO_FINAL),
			totalPrice: parseProductPrice(item.VALOR_TOTAL_ITEM),
		})),
	}
}
