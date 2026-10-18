import { create } from "zustand"

import type { OrderDetails, OrderVariables } from "@domain"

import { storage } from "../storage"

import { orderStorage } from "./orderStorage"

const SAVED_BACKGROUND_ORDER_KEY = "@BackgroundOrder"

// export const backgroundOrder = {
// 	canRun: false,
// 	draft: undefined as OrderVariables | undefined,
// 	savedOrderId: undefined as OrderDetails["id"] | undefined,
// }

// export function enableBackgroundOrderSaving() {
// 	backgroundOrder.canRun = true
// }

// export function disableBackgroundOrderSaving() {
// 	backgroundOrder.canRun = false
// 	backgroundOrder.draft = undefined
// }

// export function setBackgroundOrderDraft(order: OrderVariables) {
// 	backgroundOrder.draft = order
// }

// export async function saveBackgroundOrder(): Promise<boolean> {
// 	const { canRun, draft } = backgroundOrder
// 	const savedOrder = await storage.getItem<{
// 		id: OrderDetails["id"]
// 		notificationPending: boolean
// 	}>(SAVED_BACKGROUND_ORDER_KEY)

// 	if (
// 		!canRun ||
// 		!draft ||
// 		draft.products.length === 0 ||
// 		backgroundOrder.savedOrderId !== undefined ||
// 		savedOrder
// 	) {
// 		return false
// 	}

// 	console.log("salvou")

// 	const savedOrderId = await orderStorage.saveOrder({
// 		...draft,
// 		id: 0,
// 		status: "pending",
// 	})
// 	await storage.setItem(SAVED_BACKGROUND_ORDER_KEY, {
// 		id: savedOrderId,
// 		notificationPending: true,
// 	})
// 	backgroundOrder.savedOrderId = savedOrderId

// 	return true
// }

// export async function consumeSavedBackgroundOrderNotification(): Promise<OrderDetails | undefined> {
// 	const savedOrder = await storage.getItem<{
// 		id: OrderDetails["id"]
// 		notificationPending: boolean
// 	}>(SAVED_BACKGROUND_ORDER_KEY)

// 	if (!savedOrder) {
// 		return undefined
// 	}

// 	const orders = await orderStorage.getOrders()
// 	const order = orders.find(({ id }) => id === savedOrder.id)

// 	if (!order) {
// 		await storage.removeItem(SAVED_BACKGROUND_ORDER_KEY)
// 		backgroundOrder.savedOrderId = undefined
// 		return undefined
// 	}

// 	backgroundOrder.savedOrderId = savedOrder.id
// 	if (!savedOrder.notificationPending) {
// 		return undefined
// 	}

// 	await storage.setItem(SAVED_BACKGROUND_ORDER_KEY, {
// 		...savedOrder,
// 		notificationPending: false,
// 	})

// 	return order
// }

const initialBackgroundOrderStore = {
	canRun: false,
	draft: undefined as OrderVariables | undefined,
	savedOrderId: undefined as OrderDetails["id"] | undefined,
}

type BackgroundOrderStoreType = typeof initialBackgroundOrderStore & {
	enableBackgroundOrderSaving: () => void
	disableBackgroundOrderSaving: () => void
	setBackgroundOrderDraft: (order: OrderVariables) => void
	saveBackgroundOrder: () => Promise<boolean>
	reverseBackgroundOrder: () => Promise<void>
	showBackgroundNotification: () => Promise<boolean>
}

const backgroundOrderStore = create<BackgroundOrderStoreType>()((set, get) => ({
	...initialBackgroundOrderStore,

	showBackgroundNotification: async () => {
		const savedOrder = await storage.getItem<{
			id: OrderDetails["id"]
			notificationPending: boolean
		}>(SAVED_BACKGROUND_ORDER_KEY)
		const { canRun, savedOrderId } = get()

		if (savedOrder && !canRun && !savedOrderId) {
			await storage.removeItem(SAVED_BACKGROUND_ORDER_KEY)
			return true
		}

		return false
	},
	saveBackgroundOrder: async () => {
		const savedOrder = await storage.getItem<{
			id: OrderDetails["id"]
			notificationPending: boolean
		}>(SAVED_BACKGROUND_ORDER_KEY)
		const { canRun, draft, savedOrderId } = get()

		if (!canRun || !draft || savedOrderId !== undefined || savedOrder) {
			return false
		}

		const newSavedOrderId = await orderStorage.saveOrder({
			...draft,
			id: 0,
			status: "pending",
		})
		await storage.setItem(SAVED_BACKGROUND_ORDER_KEY, {
			id: newSavedOrderId,
			notificationPending: true,
		})

		set({ savedOrderId: newSavedOrderId })

		return true
	},
	reverseBackgroundOrder: async () => {
		const savedOrder = await storage.getItem<{
			id: OrderDetails["id"]
			notificationPending: boolean
		}>(SAVED_BACKGROUND_ORDER_KEY)
		const { savedOrderId } = get()

		if (savedOrder) {
			await storage.removeItem(SAVED_BACKGROUND_ORDER_KEY)

			if (savedOrder.id === savedOrderId) {
				orderStorage.removeOrder(savedOrder.id)
				set({ savedOrderId: undefined })
			}
		}
	},
	disableBackgroundOrderSaving: () => set(initialBackgroundOrderStore),
	enableBackgroundOrderSaving: () => set({ canRun: true }),
	setBackgroundOrderDraft: (order) => set({ draft: order }),
}))

export function useBackgroundOrderStore(): Pick<
	BackgroundOrderStoreType,
	"canRun" | "draft" | "savedOrderId"
> {
	const canRun = backgroundOrderStore((state) => state.canRun)
	const draft = backgroundOrderStore((state) => state.draft)
	const savedOrderId = backgroundOrderStore((state) => state.savedOrderId)

	return {
		canRun,
		draft,
		savedOrderId,
	}
}

export function useBackgroundOrderService(): Omit<
	BackgroundOrderStoreType,
	"canRun" | "draft" | "savedOrderId"
> {
	const disableBackgroundOrderSaving = backgroundOrderStore(
		(state) => state.disableBackgroundOrderSaving,
	)
	const enableBackgroundOrderSaving = backgroundOrderStore(
		(state) => state.enableBackgroundOrderSaving,
	)
	const saveBackgroundOrder = backgroundOrderStore((state) => state.saveBackgroundOrder)
	const setBackgroundOrderDraft = backgroundOrderStore((state) => state.setBackgroundOrderDraft)
	const reverseBackgroundOrder = backgroundOrderStore((state) => state.reverseBackgroundOrder)
	const showBackgroundNotification = backgroundOrderStore(
		(state) => state.showBackgroundNotification,
	)

	return {
		disableBackgroundOrderSaving,
		enableBackgroundOrderSaving,
		saveBackgroundOrder,
		reverseBackgroundOrder,
		setBackgroundOrderDraft,
		showBackgroundNotification,
	}
}
