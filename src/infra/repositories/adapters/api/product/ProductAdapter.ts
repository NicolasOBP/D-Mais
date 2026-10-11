import type { Product, ProductAPIContent } from "@domain"

export function adaptFuelResultToProduct(fuel: ProductAPIContent): Product {
	return {
		id: fuel.C_CDPRO,
		title: fuel.C_DESC,
	}
}
