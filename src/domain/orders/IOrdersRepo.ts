import type { Order, OrderDetails, OrderVariables } from "./OrdersType"

export interface IOrdersRepo {
	list: () => Promise<OrderDetails[]>
	send: (order: OrderVariables) => Promise<Order>
	complete: (id: number) => Promise<void>
	remove: (id: number) => Promise<void>
}
