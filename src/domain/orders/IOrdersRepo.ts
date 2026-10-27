import type { AuthUser } from "../auth"

import type { CreateOrderResult, OrderDetails, OrderVariables } from "./OrdersType"

export interface IOrdersRepo {
	list: () => Promise<OrderDetails[]>
	send: (order: OrderVariables, authUser: AuthUser) => Promise<CreateOrderResult>
	complete: (id: number) => Promise<void>
	remove: (id: number) => Promise<void>
}
