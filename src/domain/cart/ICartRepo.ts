import type { InventoryWithoutProducts } from "../inventory"

import type { CartMetadata, ProductCart, ProductCartVariables } from "./CartTypes"

export interface ICartRepo {
	add: (product: ProductCartVariables) => Promise<void>
	getCartMetadata: () => Promise<CartMetadata>
	editCartProduct: (
		productCartId: ProductCart["cartId"],
		newVolume: number,
		newInventory: InventoryWithoutProducts,
	) => Promise<ProductCart>
	deleteItem: (productCartId: ProductCart["cartId"]) => Promise<void>
	deleteItems: (productCartIds: ProductCart["cartId"][]) => Promise<void>
}
