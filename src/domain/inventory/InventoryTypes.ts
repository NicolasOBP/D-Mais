import type { Product } from "../product"

type InventoryProduct = Omit<Product, "price"> & {
	affiliate: string
	volumeAvailable: number
}

export interface Inventory {
	id: string
	description: string
	products: InventoryProduct[]
}

export type InventoryWithoutProducts = Omit<Inventory, "products">
