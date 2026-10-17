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

export type ProductPriceRequestItem = {
	C_CDPRO: string
	C_CDEST: string
	C_QTVEN: number
}

export type ProductPriceRequest = {
	C_POSTO: string
	C_CDEMPR: string
	C_ITENS: ProductPriceRequestItem[]
}

export type ProductPriceItemAPI = {
	C_CDPRO: string
	VALOR_UNITARIO_PRODUTO: string | number
	VALOR_UNITARIO_FRETE: string | number
	VALOR_UNITARIO_FINAL: string | number
	VALOR_TOTAL_ITEM: string | number
}

export type ProductPriceResultAPI = {
	STATUS: string
	MENSAGEM?: string
	VALOR_TOTAL_PEDIDO: string | number
	ITENS: ProductPriceItemAPI[]
}
export type ProductPriceResult = {
	cartTotalPrice: number
	productItems: ProductPriceResultItem[]
}

export type ProductPriceResultItem = {
	productCode: string
	price: number
	totalPrice: number
}

export type ProductPriceAPI = {
	result: ProductPriceResultAPI[]
}

export interface Product {
	id: string
	title: string
	price?: number
}
