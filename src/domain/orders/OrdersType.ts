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
	id: number
	products: Pick<ProductCart, "cartId" | "title" | "volume">[]
	client: Client
	status: OrdersStatus
	totalPrice: number
}

export interface OrderDetails extends Order {
	paymentTerms: PaymentTerms
	paymentMethod: PaymentMethod
	fareSelected: boolean
	truck: TruckPickup
	pickup?: TruckPickup
	driver: Driver
	company: Company
	products: ProductCart[]
	farePrice: number
}

export type OrderVariables = Omit<OrderDetails, "id" | "status">
