import type { IProductRepo, Product } from "@domain"

import { mockProducts } from "./data/mockProducts"

export class InMemoryProductRepo implements IProductRepo {
	async list(searchProduct: string | null): Promise<Product[]> {
		const products = mockProducts

		if (searchProduct) {
			return products.filter((prod) =>
				prod.title.toLowerCase().includes(searchProduct.toLowerCase()),
			)
		}

		return products
	}
}
