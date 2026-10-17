import type { OrderDetails } from "@domain"

import { idUtils } from "@utils"

import { storage } from "../storage"

const ORDER_KEY = "@Order"

async function saveOrder(order: OrderDetails): Promise<OrderDetails["id"]> {
	try {
		const previousOrders = await getOrders()
		const id = idUtils.generateId()
		const orderToSave = {
			...order,
			id,
		}
		const newOrders = [...previousOrders, orderToSave]
		await storage.setItem(ORDER_KEY, newOrders)
		return id
	} catch (error) {
		throw new Error("Erro ao salvar o pedido no armazenamento local.", {
			cause: { cause: String(error) },
		})
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
		throw new Error("Erro ao remover pedido.", { cause: String(error) })
	}
}

async function updateOrder(order: OrderDetails): Promise<void> {
	try {
		const previousOrders = await getOrders()
		const orderExists = previousOrders.some((previousOrder) => previousOrder.id === order.id)

		if (!orderExists) {
			return
		}

		const updatedOrders = previousOrders.map((previousOrder) =>
			previousOrder.id === order.id ? { ...order, id: idUtils.generateId() } : previousOrder,
		)
		await storage.setItem(ORDER_KEY, updatedOrders)
	} catch (error) {
		throw new Error("Erro ao atualizar pedido no armazenamento local.", {
			cause: String(error),
		})
	}
}

export const orderStorage = {
	saveOrder,
	getOrders,
	removeOrder,
	updateOrder,
}
