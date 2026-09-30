import type { InventoryWithoutProducts } from "../inventory"

import type {
	CartMetadata,
	ProductCart,
	ProductCartScreen,
	ProductCartVariables,
} from "./CartTypes"

export interface ICartRepo {
	add: (product: ProductCartVariables) => Promise<ProductCart>
	getCartItems: () => Promise<ProductCartScreen[]>
	getCartMetadata: () => Promise<CartMetadata>
	editCartProduct: (
		productCartId: ProductCart["cartId"],
		newVolume: number,
		newInventory: InventoryWithoutProducts,
	) => Promise<ProductCart>
	deleteItem: (productCartId: ProductCart["cartId"]) => Promise<ProductCart["cartId"]>
	deleteItems: (productCartIds: ProductCart["cartId"][]) => Promise<ProductCart["cartId"][]>
}
