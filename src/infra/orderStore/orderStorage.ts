import type { OrderDetails } from "@domain"

import { storage } from "../storage"

const ORDER_KEY = "@Order"

async function saveOrder(order: OrderDetails): Promise<void> {
	try {
		const previousOrders = await getOrders()
		const newOrders = [...previousOrders, order]
		await storage.setItem(ORDER_KEY, newOrders)
	} catch (error) {
		console.log(error)

		throw new Error("Erro ao salvar o pedido no armazenamento local.")
	}
}

async function getOrders(): Promise<OrderDetails[]> {
	const orders = await storage.getItem<OrderDetails[]>(ORDER_KEY)
	return orders ?? []
}

async function removeOrder(orderId: OrderDetails["id"]): Promise<void> {
	try {
		const previousOrders = await getOrders()
		const newOrders = previousOrders.filter((order) => order.id !== orderId)
		await storage.setItem(ORDER_KEY, newOrders)
	} catch (error) {
		console.log(error)

		throw new Error("Erro ao remover pedido.")
	}
}

export const orderStorage = {
	saveOrder,
	getOrders,
	removeOrder,
}
