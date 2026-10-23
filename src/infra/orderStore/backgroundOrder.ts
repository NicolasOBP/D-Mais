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
		const savedOrderId = await storage.getItem<number>(SAVED_BACKGROUND_ORDER_KEY)

		const { canRun } = get()

		if (savedOrderId && !canRun) {
			await storage.removeItem(SAVED_BACKGROUND_ORDER_KEY)
			return true
		}

		return false
	},
	saveBackgroundOrder: async () => {
		const { canRun, savedOrderId } = get()

		if (!canRun || savedOrderId !== undefined) {
			return false
		}

		const prevSavedOrderId = await storage.getItem<number>(SAVED_BACKGROUND_ORDER_KEY)

		if (prevSavedOrderId) return false

		const order = orderStore.getState().getOrder()

		if (order.products.length === 0) return false

		const newSavedOrderId = await orderStorage.saveOrder({
			...order,
			id: 0,
			status: "pending",
		})

		try {
			await storage.setItem(SAVED_BACKGROUND_ORDER_KEY, newSavedOrderId)
		} catch (error) {
			await orderStorage.removeOrder(newSavedOrderId)
			throw error
		}

		set({ savedOrderId: newSavedOrderId })
		return true
	},
	reverseBackgroundOrder: async () => {
		const prevSavedOrderId = await storage.getItem<number>(SAVED_BACKGROUND_ORDER_KEY)
		const { savedOrderId } = get()

		if (!prevSavedOrderId || prevSavedOrderId !== savedOrderId) return

		await orderStorage.removeOrder(prevSavedOrderId)
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
