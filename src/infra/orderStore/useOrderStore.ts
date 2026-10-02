import { create } from "zustand"

import type { OrderDetails, OrderVariables } from "@domain"

const initialOrder: OrderDetails = {
	id: 0,
	products: [],
	client: { name: "", corporateReason: "", cnpjCpf: "" },
	status: "pending",
	totalPrice: 0,
	paymentTerms: { id: "", description: "" },
	paymentMethod: { id: "", description: "" },
	table: "",
	fareSelected: false,
	truck: { licensePlate: "" },
	driver: { name: "", cpf: "" },
	company: { name: "", cnpj: "" },
}

export type OrderStoreType = OrderDetails & {
	productsTotal: number
	priceAdjustments: number
	setProductsTotal: (productsTotal: number) => void
	updateOrderTotalPrice: (priceAdjustment: number) => void
	setOrderDetails: (order: OrderVariables) => void
	clearOrder: () => void
}

export const useOrderStore = create<OrderStoreType>()((set) => ({
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
	clearOrder: () => set({ ...initialOrder, productsTotal: 0, priceAdjustments: 0 }),
}))

export function useOrderTotalPrice(): number {
	return useOrderStore((state) => state.totalPrice)
}

export function useOrderServiceZustand(): Pick<
	OrderStoreType,
	"setProductsTotal" | "updateOrderTotalPrice" | "setOrderDetails" | "clearOrder"
> {
	const setProductsTotal = useOrderStore((state) => state.setProductsTotal)
	const updateOrderTotalPrice = useOrderStore((state) => state.updateOrderTotalPrice)
	const setOrderDetails = useOrderStore((state) => state.setOrderDetails)
	const clearOrder = useOrderStore((state) => state.clearOrder)

	return { setProductsTotal, updateOrderTotalPrice, setOrderDetails, clearOrder }
}
