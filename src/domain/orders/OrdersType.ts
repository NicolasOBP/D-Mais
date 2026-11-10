import type { ProductCart } from "../cart"
import type { Client, Company, Driver, PaymentMethod, PaymentTerms, TruckPickup } from "../sells"

export type OrdersStatus = "pending" | "completed" | "cancelled"

export type CreateOrderResult = {
	STATUS: "OK"
	IDREC: string
	VALOR_FINAL: number
}

export type CreateOrderAPIContent = {
	STATUS: string
	IDREC?: string
	VALOR_FINAL?: number
	MENSAGEM?: string
}

export type CreateOrderAPI = {
	result: (CreateOrderAPIContent | string)[]
}

export interface Order {
	id: string | number
	products: {
		cartId: string | number
		title: string
		volume: number
	}[]
	client: Pick<Client, "name">
	status: OrdersStatus
	totalPrice: number
}

export interface OrderDetails extends Order {
	paymentTerms: PaymentTerms
	paymentMethod: PaymentMethod
	fareSelected: boolean
	truck: TruckPickup
	pickup?: TruckPickup
	client: Client
	driver: Driver
	company: Company
	products: ProductCart[]
	farePrice: number
}

export type OrderVariables = Omit<OrderDetails, "id" | "status">

export type OrderListAPIContent = {
	c_idrec: string
	c_nmfant: string
	c_vltotal: number
	status: string
	itens: {
		c_desc: string
		c_qtven: number
	}[]
}

export type OrderListAPI = {
	result: OrderListAPIContent[][]
}

export type OrderDetailAPIContent = {
	c_idrec: string
	c_vltotal: number
	c_dttran: string
	status: string
	c_rgcli: string
	c_razso: string
	c_nmfant: string
	c_condpagto: string
	c_km: string
	c_tppagto: string
	c_placa: string
	c_placa_b: string
	c_rgent: string
	c_rgaux: string
	c_tpfrete: string
	c_vlfrete: number
	itens: {
		c_itrec: string
		c_cdpro: string
		c_desc: string
		c_cdest: string
		c_qtven: number
		c_vlunit: number
		c_vltotal: number
	}[]
}

export type OrderDetailAPI = {
	result: OrderDetailAPIContent[]
}
