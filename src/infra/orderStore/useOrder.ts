import type { OrderDetails } from "@domain"

import { useOrderServiceZustand, useOrderStore, useOrderTotalPrice } from "./useOrderStore"

export function useOrderItems(): OrderDetails {
	const totalPrice = useOrderTotalPrice()
	const products = useOrderStore((state) => state.products)
	const id = useOrderStore((state) => state.id)
	const client = useOrderStore((state) => state.client)
	const status = useOrderStore((state) => state.status)
	const paymentTerms = useOrderStore((state) => state.paymentTerms)
	const paymentMethod = useOrderStore((state) => state.paymentMethod)
	const table = useOrderStore((state) => state.table)
	const fareSelected = useOrderStore((state) => state.fareSelected)
	const truck = useOrderStore((state) => state.truck)
	const pickup = useOrderStore((state) => state.pickup)
	const driver = useOrderStore((state) => state.driver)
	const company = useOrderStore((state) => state.company)

	return {
		id,
		products,
		client,
		status,
		totalPrice,
		paymentTerms,
		paymentMethod,
		table,
		fareSelected,
		truck,
		pickup,
		driver,
		company,
	}
}

export function useOrderService() {
	return useOrderServiceZustand()
}
