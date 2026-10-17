import type { OrderDetails, OrderVariables } from "@domain"

import { storage } from "../storage"

import { orderStorage } from "./orderStorage"

const SAVED_BACKGROUND_ORDER_KEY = "@BackgroundOrder"

const backgroundOrder = {
	canRun: false,
	draft: undefined as OrderVariables | undefined,
	savedOrderId: undefined as OrderDetails["id"] | undefined,
}

export function enableBackgroundOrderSaving() {
	backgroundOrder.canRun = true
}

export function disableBackgroundOrderSaving() {
	backgroundOrder.canRun = false
	backgroundOrder.draft = undefined
}

export function setBackgroundOrderDraft(order: OrderVariables) {
	backgroundOrder.draft = order
}

export async function saveBackgroundOrder(): Promise<boolean> {
	const { canRun, draft } = backgroundOrder
	const savedOrder = await storage.getItem<{
		id: OrderDetails["id"]
		notificationPending: boolean
	}>(SAVED_BACKGROUND_ORDER_KEY)

	if (
		!canRun ||
		!draft ||
		draft.products.length === 0 ||
		backgroundOrder.savedOrderId !== undefined ||
		savedOrder
	) {
		return false
	}

	const savedOrderId = await orderStorage.saveOrder({
		...draft,
		id: 0,
		status: "pending",
	})
	await storage.setItem(SAVED_BACKGROUND_ORDER_KEY, {
		id: savedOrderId,
		notificationPending: true,
	})
	backgroundOrder.savedOrderId = savedOrderId

	return true
}

export async function consumeSavedBackgroundOrderNotification(): Promise<OrderDetails | undefined> {
	const savedOrder = await storage.getItem<{
		id: OrderDetails["id"]
		notificationPending: boolean
	}>(SAVED_BACKGROUND_ORDER_KEY)

	if (!savedOrder) {
		return undefined
	}

	const orders = await orderStorage.getOrders()
	const order = orders.find(({ id }) => id === savedOrder.id)

	if (!order) {
		await storage.removeItem(SAVED_BACKGROUND_ORDER_KEY)
		backgroundOrder.savedOrderId = undefined
		return undefined
	}

	backgroundOrder.savedOrderId = savedOrder.id
	if (!savedOrder.notificationPending) {
		return undefined
	}

	await storage.setItem(SAVED_BACKGROUND_ORDER_KEY, {
		...savedOrder,
		notificationPending: false,
	})

	return order
}
