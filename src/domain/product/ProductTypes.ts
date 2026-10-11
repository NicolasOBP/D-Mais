export type ProductAPI = {
	result: ProductAPIContent[][]
}
export type ProductAPIContent = {
	C_EAN13: string | null
	C_CDPRO: string
	C_DESC: string
	C_VLVENDA: number
	C_VLVENDA_B: number
	C_VLVENDA_C: number
	C_GUP: string
	C_SITUTRIB: string | null
	C_UNMED: string
	C_CLASFISCAL: string | null
	C_SITUTRIB_NF: number
}

export interface Product {
	id: string
	title: string
	price?: number
}
