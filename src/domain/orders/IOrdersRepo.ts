import type { AuthUser } from "../auth"

import type { CreateOrderResult, Order, OrderVariables } from "./OrdersType"

export interface IOrdersRepo {
	list: (authUser: AuthUser) => Promise<Order[]>
	send: (order: OrderVariables, authUser: AuthUser) => Promise<CreateOrderResult>
}
