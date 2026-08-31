import type { Inventory } from "../inventory"

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
		newInventory: Inventory,
	) => Promise<ProductCart>
	deleteItem: (productCartId: ProductCart["cartId"]) => Promise<ProductCart["cartId"]>
	deleteItems: (productCartIds: ProductCart["cartId"][]) => Promise<ProductCart["cartId"][]>
}
