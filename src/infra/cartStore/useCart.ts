import { type CartStoreType, useCartServiceZustand, useCartStoreZustand } from "./useCartStore"

export function useCartItems(): Pick<
	CartStoreType,
	"productCartStore" | "selectedItems" | "totalSelectedPrice"
> {
	const { productCartStore, selectedItems, totalSelectedPrice } = useCartStoreZustand()

	return { productCartStore, selectedItems, totalSelectedPrice }
}

export function useCartService(): Omit<
	CartStoreType,
	"productCartStore" | "selectedItems" | "totalSelectedPrice"
> {
	return useCartServiceZustand()
}
