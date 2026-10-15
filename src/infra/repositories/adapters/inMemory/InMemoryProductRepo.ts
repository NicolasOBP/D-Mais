import type { IProductRepo, Product, ProductCartVariables, ProductPriceResult } from "@domain"

import { mockProducts } from "./data/mockProducts"
import { delay } from "./delay"

export class InMemoryProductRepo implements IProductRepo {
	async list(searchProduct: string | null): Promise<Product[]> {
		await delay()

		const products = mockProducts

		if (searchProduct) {
			return products.filter((prod) =>
				prod.title.toLowerCase().includes(searchProduct.toLowerCase()),
			)
		}

		return products
	}

	async calcPrice(
		requestProducts: ProductCartVariables | ProductCartVariables[],
	): Promise<ProductPriceResult> {
		await delay()

		const products = Array.isArray(requestProducts) ? requestProducts : [requestProducts]
		const items = products.map((requestedItem) => {
			const product = mockProducts.find(({ id }) => id === requestedItem.id)

			if (!product?.price) {
				throw new Error(`Preço indisponível para o produto ${requestedItem.id}.`)
			}

			const totalItem = product.price * requestedItem.volume

			return {
				productCode: requestedItem.id,
				price: product.price,
				totalPrice: totalItem,
			}
		})

		return {
			cartTotalPrice: items.reduce((total, item) => total + item.totalPrice, 0),
			productItems: items,
		}
	}
}
