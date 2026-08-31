import type { Order, OrderVariables } from "./OrdersType"

export interface IOrdersRepo {
	list: () => Promise<Order[]>
	send: (order: OrderVariables) => Promise<Order>
}
