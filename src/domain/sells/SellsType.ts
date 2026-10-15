import type { ProductPriceRequestItem } from "../product"

export type SendCartAPIContent = {
	STATUS: string
	MENSAGEM?: string
}

export type SendCartAPI = {
	result: (SendCartAPIContent | string)[]
}

export type SendCartItems = ProductPriceRequestItem[]

export type Client = {
	name: string
	corporateReason: string
	cnpjCpf: string
}

export type Truck = {
	licensePlate: string
}

export type Pickup = {
	licensePlate: string
}

export type Driver = {
	name: string
	cpf: string
}

export type Company = {
	name: string
	cnpj: string
}

export type PaymentTerms = {
	id: string
	description: string
}

export type PaymentMethod = {
	id: string
	description: string
}

export type TablePrices = {
	paymentTermsId: PaymentTerms["id"]
	tableName: string
	price: number
}
