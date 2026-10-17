import { create } from "zustand"

import type { OrderDetails, OrderVariables } from "@domain"

import { orderStorage } from "./orderStorage"

const initialOrder: OrderDetails = {
	id: 0,
	products: [],
	client: { name: "", corporateReason: "", cnpjCpf: "" },
	status: "pending",
	totalPrice: 0,
	paymentTerms: { id: "", description: "", table: "" },
	paymentMethod: { id: "", description: "" },
	table: "",
	fareSelected: false,
	truck: { licensePlate: "", id: "" },
	driver: { name: "", cpf: "" },
	company: { name: "", cnpj: "" },
}

type OrderStoreType = OrderDetails & {
	productsTotal: number
	priceAdjustments: number
	setProductsTotal: (productsTotal: number) => void
	updateOrderTotalPrice: (priceAdjustment: number) => void
	setOrderDetails: (order: OrderVariables) => void
	saveOrderInStorage: () => Promise<void>
	updateOrderInStorage: (order: OrderDetails) => Promise<void>
	removeOrderFromStorage: (orderId: number) => Promise<void>
	getOrderFromStorage: () => Promise<OrderDetails[]>
	getTotalOrdersInStorage: () => Promise<number>
	clearOrder: () => void
}

export const orderStore = create<OrderStoreType>()((set) => ({
	...initialOrder,
	productsTotal: 0,
	priceAdjustments: 0,
	setProductsTotal: (productsTotal) =>
		set((state) => ({
			productsTotal,
			totalPrice: productsTotal + state.priceAdjustments,
		})),
	updateOrderTotalPrice: (priceAdjustment) =>
		set((state) => ({
			priceAdjustments: state.priceAdjustments + priceAdjustment,
			totalPrice: state.totalPrice + priceAdjustment,
		})),
	setOrderDetails: (order) => set(order),
	saveOrderInStorage: async () => {
		const { saveOrder } = orderStorage
		const order: OrderDetails = orderStore.getState()
		await saveOrder(order)
	},
	updateOrderInStorage: async (order) => {
		const { updateOrder } = orderStorage
		await updateOrder(order)
	},
	removeOrderFromStorage: async (orderId) => {
		const { removeOrder } = orderStorage
		removeOrder(orderId)
	},
	getOrderFromStorage: async () => {
		const { getOrders } = orderStorage
		const orders = await getOrders()

		return orders
	},
	getTotalOrdersInStorage: async () => {
		const { getOrders } = orderStorage
		const orders = await getOrders()

		return orders.length
	},
	clearOrder: () => set({ ...initialOrder, productsTotal: 0, priceAdjustments: 0 }),
}))

export function useOrderServiceZustand(): Pick<
	OrderStoreType,
	| "setProductsTotal"
	| "updateOrderTotalPrice"
	| "setOrderDetails"
	| "clearOrder"
	| "saveOrderInStorage"
	| "updateOrderInStorage"
	| "getOrderFromStorage"
	| "getTotalOrdersInStorage"
	| "removeOrderFromStorage"
> {
	const setProductsTotal = orderStore((state) => state.setProductsTotal)
	const updateOrderTotalPrice = orderStore((state) => state.updateOrderTotalPrice)
	const setOrderDetails = orderStore((state) => state.setOrderDetails)
	const clearOrder = orderStore((state) => state.clearOrder)
	const saveOrderInStorage = orderStore((state) => state.saveOrderInStorage)
	const updateOrderInStorage = orderStore((state) => state.updateOrderInStorage)
	const getOrderFromStorage = orderStore((state) => state.getOrderFromStorage)
	const getTotalOrdersInStorage = orderStore((state) => state.getTotalOrdersInStorage)
	const removeOrderFromStorage = orderStore((state) => state.removeOrderFromStorage)

	return {
		setProductsTotal,
		saveOrderInStorage,
		updateOrderTotalPrice,
		setOrderDetails,
		clearOrder,
		updateOrderInStorage,
		getOrderFromStorage,
		getTotalOrdersInStorage,
		removeOrderFromStorage,
	}
}
