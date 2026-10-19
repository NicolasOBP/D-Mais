import { create } from "zustand"

import type { OrderDetails, OrderVariables } from "@domain"

import { storage } from "../storage"

import { orderStorage } from "./orderStorage"

const SAVED_BACKGROUND_ORDER_KEY = "@BackgroundOrder"

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
