import type { CreateOrderResult, IOrdersRepo, OrderDetails, OrderVariables } from "@domain"

import { delay } from "./delay"

let InnerOrders: OrderDetails[] = []

let error = true

export class InMemoryOrdersRepo implements IOrdersRepo {
	async list(): Promise<OrderDetails[]> {
		await delay()

		return [...InnerOrders]
	}

	async send(order: OrderVariables): Promise<CreateOrderResult> {
		await delay()

		if (error) {
			throw new Error("Cliente sem limite de crédito. Limite: R$0,00 | Total: R$10,55")
		}

		const newOrder: OrderDetails = {
			id: InnerOrders.length + Math.floor(Math.random() * 1000),
			status: "completed",
			...order,
		}
		InnerOrders = [...InnerOrders, newOrder]

		return {
			STATUS: "OK",
			IDREC: String(newOrder.id),
			VALOR_FINAL: order.totalPrice,
		}
	}

	async complete(id: number): Promise<void> {
		await delay()

		InnerOrders = InnerOrders.map((order) =>
			order.id === id ? { ...order, status: "completed" } : order,
		)
	}

	async remove(id: number): Promise<void> {
		await delay()

		InnerOrders = InnerOrders.filter((order) => order.id !== id)
	}
}
