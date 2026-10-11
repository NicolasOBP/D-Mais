import type { Product } from "../product"

export type InventoryAPI = {
	result: InventoryAPIContent[][]
}

export type InventoryAPIContent = {
	C_CDPRO: string
	DESC_PRODUTO: string
	C_CODBASE: string
	C_CODESTOQUE: string
	C_DESCESTOQUE: string
	C_PRECOANTECIP: string | number
	C_PRECO1DIA: string | number
	C_PRECO2DIAS: string | number
	C_PRECO4DIAS: string | number
	C_PRECO7DIAS: string | number
	C_PRECO10DIAS: string | number
	C_PRECO15DIAS: string | number
}

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
