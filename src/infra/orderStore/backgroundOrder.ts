import { create } from "zustand"

import type { OrderDetails } from "@domain"

import { storage } from "../storage"

import { orderStorage } from "./orderStorage"
import { orderStore } from "./orderStore"

const SAVED_BACKGROUND_ORDER_KEY = "@BackgroundOrder"

const initialBackgroundOrderStore = {
	canRun: false,
	savedOrderId: undefined as OrderDetails["id"] | undefined,
}

let saveInProgress: Promise<boolean> | undefined

type BackgroundOrderStoreType = typeof initialBackgroundOrderStore & {
	enableBackgroundOrderSaving: () => void
	disableBackgroundOrderSaving: () => void
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
		if (saveInProgress) return saveInProgress

		saveInProgress = (async () => {
			const { canRun, savedOrderId } = get()

			if (!canRun || savedOrderId !== undefined) {
				return false
			}

			const savedOrder = await storage.getItem<{
				id: OrderDetails["id"]
				notificationPending: boolean
			}>(SAVED_BACKGROUND_ORDER_KEY)

			if (savedOrder) return false

			const order = orderStore.getState().getOrder()

			if (order.products.length === 0) return false

			const newSavedOrderId = await orderStorage.saveOrder({
				...order,
				id: 0,
				status: "pending",
			})

			try {
				await storage.setItem(SAVED_BACKGROUND_ORDER_KEY, {
					id: newSavedOrderId,
					notificationPending: true,
				})
			} catch (error) {
				await orderStorage.removeOrder(newSavedOrderId)
				throw error
			}

			set({ savedOrderId: newSavedOrderId })
			return true
		})()

		try {
			return await saveInProgress
		} finally {
			saveInProgress = undefined
		}
	},
	reverseBackgroundOrder: async () => {
		if (saveInProgress) await saveInProgress

		const savedOrder = await storage.getItem<{
			id: OrderDetails["id"]
			notificationPending: boolean
		}>(SAVED_BACKGROUND_ORDER_KEY)
		const { savedOrderId } = get()

		if (!savedOrder || savedOrder.id !== savedOrderId) return

		await orderStorage.removeOrder(savedOrder.id)
		await storage.removeItem(SAVED_BACKGROUND_ORDER_KEY)
		set({ savedOrderId: undefined })
	},
	disableBackgroundOrderSaving: () => set(initialBackgroundOrderStore),
	enableBackgroundOrderSaving: () => set({ canRun: true }),
}))

export function useBackgroundOrderStore(): Pick<
	BackgroundOrderStoreType,
	"canRun" | "savedOrderId"
> {
	const canRun = backgroundOrderStore((state) => state.canRun)
	const savedOrderId = backgroundOrderStore((state) => state.savedOrderId)

	return {
		canRun,
		savedOrderId,
	}
}

export function useBackgroundOrderService(): Omit<
	BackgroundOrderStoreType,
	"canRun" | "savedOrderId"
> {
	const disableBackgroundOrderSaving = backgroundOrderStore(
		(state) => state.disableBackgroundOrderSaving,
	)
	const enableBackgroundOrderSaving = backgroundOrderStore(
		(state) => state.enableBackgroundOrderSaving,
	)
	const saveBackgroundOrder = backgroundOrderStore((state) => state.saveBackgroundOrder)
	const reverseBackgroundOrder = backgroundOrderStore((state) => state.reverseBackgroundOrder)
	const showBackgroundNotification = backgroundOrderStore(
		(state) => state.showBackgroundNotification,
	)

	return {
		disableBackgroundOrderSaving,
		enableBackgroundOrderSaving,
		saveBackgroundOrder,
		reverseBackgroundOrder,
		showBackgroundNotification,
	}
}
