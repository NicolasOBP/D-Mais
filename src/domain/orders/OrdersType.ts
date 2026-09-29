import type { ProductCart } from "../cart"
import type { Client, Company, Driver, PaymentMethod, PaymentTerms, Pickup, Truck } from "../sells"

export type OrdersStatus = "pending" | "completed" | "cancelled"

export interface Order {
	id: number
	products: Pick<ProductCart, "cartId" | "title" | "volume">[]
	client: Client
	status: OrdersStatus
	totalPrice: string
}

export interface OrderDetails extends Order {
	paymentTerms: PaymentTerms
	paymentMethod: PaymentMethod
	table: string
	fareSelected: boolean
	truck: Truck
	pickup?: Pickup
	driver: Driver
	company: Company
	products: Pick<ProductCart, "cartId" | "title" | "volume" | "price">[]
}

export type OrderVariables = Omit<OrderDetails, "id" | "status">
