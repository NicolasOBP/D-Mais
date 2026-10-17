import {
	type cartServices,
	type cartStore,
	useCartServiceZustand,
	useCartStoreZustand,
} from "./cartStore"

export function useCartStore(): cartStore {
	const { cartProducts, selectedItems, totalSelectedPrice, totalPrice } = useCartStoreZustand()

	return { cartProducts, selectedItems, totalSelectedPrice, totalPrice }
}

export function useCartService(): cartServices {
	return useCartServiceZustand()
}
