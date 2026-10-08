import type { Product } from "@domain"

import type { FuelResult } from "./productSchema"

export function adaptFuelResultToProduct(fuel: FuelResult): Product {
	return {
		id: fuel.C_CDPRO,
		title: fuel.C_DESC,
	}
}
