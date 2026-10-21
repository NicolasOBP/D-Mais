import type { OrderDetails } from "@domain"

import { orderStore, useOrderServiceZustand } from "./orderStore"

export function useOrderStore(): OrderDetails {
	const totalPrice = orderStore((state) => state.totalPrice)
	const products = orderStore((state) => state.products)
	const id = orderStore((state) => state.id)
	const client = orderStore((state) => state.client)
	const status = orderStore((state) => state.status)
	const paymentTerms = orderStore((state) => state.paymentTerms)
	const paymentMethod = orderStore((state) => state.paymentMethod)
	const fareSelected = orderStore((state) => state.fareSelected)
	const truck = orderStore((state) => state.truck)
	const pickup = orderStore((state) => state.pickup)
	const driver = orderStore((state) => state.driver)
	const company = orderStore((state) => state.company)
	const farePrice = orderStore((state) => state.farePrice)

	return {
		id,
		products,
		client,
		status,
		totalPrice,
		paymentTerms,
		paymentMethod,
		fareSelected,
		truck,
		pickup,
		driver,
		company,
		farePrice,
	}
}

export function useOrderService() {
	return useOrderServiceZustand()
}
