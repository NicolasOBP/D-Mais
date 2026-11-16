import type { AuthUser } from "../auth"

import type { CreateOrderResult, Order, OrderDetails, OrderVariables } from "./OrdersType"

export interface IOrdersRepo {
	list: (authUser: AuthUser) => Promise<Order[]>
	details: (idrec: string, cdempr: string) => Promise<OrderDetails>
	send: (order: OrderVariables, authUser: AuthUser) => Promise<CreateOrderResult>
}
