import type { InventoryWithoutProducts } from "../inventory"

import type { CartMetadata, ProductCart, ProductCartAddVariables } from "./CartTypes"

export interface ICartRepo {
	add: (product: ProductCartAddVariables) => Promise<void>
	getCartMetadata: () => Promise<CartMetadata>
	editCartProduct: (
		productCartId: ProductCart["cartId"],
		newVolume: number,
		newInventory: InventoryWithoutProducts,
		newPrice: number,
		newTotalPrice: number,
	) => Promise<ProductCart>
	deleteItem: (productCartId: ProductCart["cartId"]) => Promise<void>
	deleteItems: (productCartIds: ProductCart["cartId"][]) => Promise<void>
}
