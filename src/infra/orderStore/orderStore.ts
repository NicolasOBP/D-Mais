import { create } from "zustand"

import type { FinalOrderPriceResult, OrderDetails, OrderVariables, ProductCart } from "@domain"

import { orderStorage } from "./orderStorage"

const initialOrder: OrderDetails = {
	id: 0,
	products: [],
	client: { name: "", corporateReason: "", rg: "" },
	status: "pending",
	totalPrice: 0,
	paymentTerms: { id: "", description: "", table: "" },
	paymentMethod: { id: "", description: "" },
	fareSelected: false,
	farePrice: 0,
	truck: { licensePlate: "", id: "" },
	driver: { name: "", rg: "" },
	company: { name: "", rg: "" },
}

type OrderStoreType = OrderDetails & {
	productsTotal: number
	priceAdjustments: number
	updateOrderProductsDetails: (totalPrice: number, products: ProductCart[]) => void
	updateOrderFormDataDetails: (
		formData: Omit<OrderDetails, "id" | "products" | "status" | "totalPrice" | "farePrice">,
	) => void
	getOrder: () => OrderVariables
	setProductsTotal: (productsTotal: number) => void
	updateOrderTotalPrice: (priceAdjustment: number) => void
	saveOrderInStorage: () => Promise<void>
	updateOrderInStorage: (order: OrderDetails) => Promise<void>
	removeOrderFromStorage: (orderId: number) => Promise<void>
	getOrderFromStorage: () => Promise<OrderDetails[]>
	getTotalOrdersInStorage: () => Promise<number>
	updateProductsPrice: (productsFinalPrice: FinalOrderPriceResult) => void
	clearOrder: () => void
}

export const orderStore = create<OrderStoreType>()((set, get) => ({
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
	updateOrderProductsDetails: (totalPrice, products) => set({ totalPrice, products }),
	updateOrderFormDataDetails: ({
		client,
		paymentTerms,
		paymentMethod,
		fareSelected,
		truck,
		pickup,
		driver,
		company,
	}) => set({ client, paymentTerms, paymentMethod, fareSelected, truck, pickup, driver, company }),
	getOrder: () => {
		const {
			client,
			company,
			driver,
			fareSelected,
			paymentMethod,
			paymentTerms,
			products,
			pickup,
			totalPrice,
			truck,
			farePrice,
		} = get()
		return {
			client,
			company,
			driver,
			fareSelected,
			paymentMethod,
			paymentTerms,
			products,
			pickup,
			totalPrice,
			truck,
			farePrice,
		}
	},
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
	updateProductsPrice: (productsFinalPrice) =>
		set({
			farePrice: productsFinalPrice.farePrice,
			totalPrice: productsFinalPrice.orderTotalPrice,
			products: productsFinalPrice.orderProductItems,
		}),
	clearOrder: () => set({ ...initialOrder, productsTotal: 0, priceAdjustments: 0 }),
}))

export function useOrderServiceZustand(): Pick<
	OrderStoreType,
	| "setProductsTotal"
	| "updateOrderTotalPrice"
	| "clearOrder"
	| "saveOrderInStorage"
	| "updateOrderInStorage"
	| "getOrderFromStorage"
	| "getTotalOrdersInStorage"
	| "removeOrderFromStorage"
	| "updateOrderProductsDetails"
	| "updateOrderFormDataDetails"
	| "getOrder"
	| "updateProductsPrice"
> {
	const setProductsTotal = orderStore((state) => state.setProductsTotal)
	const updateOrderTotalPrice = orderStore((state) => state.updateOrderTotalPrice)
	const clearOrder = orderStore((state) => state.clearOrder)
	const saveOrderInStorage = orderStore((state) => state.saveOrderInStorage)
	const updateOrderInStorage = orderStore((state) => state.updateOrderInStorage)
	const getOrderFromStorage = orderStore((state) => state.getOrderFromStorage)
	const getTotalOrdersInStorage = orderStore((state) => state.getTotalOrdersInStorage)
	const removeOrderFromStorage = orderStore((state) => state.removeOrderFromStorage)
	const updateOrderProductsDetails = orderStore((state) => state.updateOrderProductsDetails)
	const updateOrderFormDataDetails = orderStore((state) => state.updateOrderFormDataDetails)
	const updateProductsPrice = orderStore((state) => state.updateProductsPrice)
	const getOrder = orderStore((state) => state.getOrder)

	return {
		setProductsTotal,
		saveOrderInStorage,
		updateOrderTotalPrice,
		clearOrder,
		updateOrderInStorage,
		getOrderFromStorage,
		getTotalOrdersInStorage,
		updateOrderProductsDetails,
		removeOrderFromStorage,
		updateOrderFormDataDetails,
		updateProductsPrice,
		getOrder,
	}
}
