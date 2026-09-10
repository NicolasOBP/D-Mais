import type { Product } from "../product"

export type InventoryProduct = Omit<Product, "price"> & {
	volumeAvailable: number
}

export interface Inventory {
	id: string
	description: string
	affiliate: string
	products: InventoryProduct[]
}

export type InventoryWithoutProducts = Omit<Inventory, "products" | "affiliate">
