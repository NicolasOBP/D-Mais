import type { IOrdersRepo, Order, OrderDetails, OrderVariables } from "@domain"

import { delay } from "./delay"

let InnerOrders: OrderDetails[] = []

export class InMemoryOrdersRepo implements IOrdersRepo {
	async list(): Promise<OrderDetails[]> {
		await delay()

		return [...InnerOrders]
	}

	async send(order: OrderVariables): Promise<Order> {
		await delay()

		const newOrder: OrderDetails = {
			id: InnerOrders.length + Math.floor(Math.random() * 1000),
			status: "pending",
			...order,
		}
		InnerOrders = [...InnerOrders, newOrder]

		return newOrder
	}
}
