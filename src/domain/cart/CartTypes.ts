import type { InventoryWithoutProducts } from "../inventory"
import type { Product } from "../product"

export interface ProductCart extends Product {
	volume: number
	inventory: InventoryWithoutProducts
	cartId: number
	totalPrice: number
}
export interface ProductCartScreen extends ProductCart {
	isSelected: boolean
}

export type ProductCartVariables = Omit<ProductCart, "cartId" | "price" | "totalPrice">
export type ProductCartAddVariables = Omit<ProductCart, "cartId">
export type CartMetadata = Omit<Cart, "cartProducts">

export type Cart = {
	cartProducts: ProductCart[]
	totalPrice: number
	totalItems: number
}
