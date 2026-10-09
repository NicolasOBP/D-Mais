import { create } from "zustand"

import type { ICartRepo, ProductCart, ProductCartScreen } from "@domain"

import { createJSONStorage, persist } from "zustand/middleware"

import { zustandStorage } from "../storage"

const initialState: {
	cartProducts: ProductCartScreen[]
	selectedItems: number
	totalSelectedPrice: number
	totalPrice: number
} = {
	cartProducts: [],
	selectedItems: 0,
	totalSelectedPrice: 0,
	totalPrice: 0,
}

export type CartStoreType = typeof initialState &
	ICartRepo & {
		toggleProductSelection: (productCartId: number) => void
		getSelectedProducts: () => ProductCartScreen[]
		getSelectedVolume: () => number
	}

const useCartStore = create<CartStoreType>()(
	persist(
		(set, get) => ({
			...initialState,

			add: async (product) => {
				set((state) => {
					const existingProduct = state.cartProducts.find((item) => item.id === product.id)

					if (
						existingProduct &&
						existingProduct.inventory.description === product.inventory.description &&
						existingProduct.inventory.id === product.inventory.id
					) {
						state.totalSelectedPrice +=
							(product.volume - existingProduct.volume) * (product.price ?? 0)

						existingProduct.volume = product.volume

						return {
							cartProducts: state.cartProducts,
						}
					}

					const newProductCart: ProductCartScreen = {
						...product,
						isSelected: true,
						cartId: get().cartProducts.length + Math.random(),
					}

					state.selectedItems += 1
					state.totalSelectedPrice += product.volume * (product.price ?? 0)

					return {
						cartProducts: [...state.cartProducts, newProductCart],
					}
				})
			},

			deleteItem: async (productCartId) => {
				set((state) => {
					const productToRemove = state.cartProducts.find((item) => item.cartId === productCartId)

					if (productToRemove?.isSelected) {
						state.selectedItems -= 1
						state.totalSelectedPrice -= productToRemove.volume * (productToRemove.price ?? 0)
					}

					return {
						cartProducts: state.cartProducts.filter((item) => item.cartId !== productCartId),
					}
				})
			},

			deleteItems: async (productCartIds) => {
				set((state) => {
					const productsToRemove = state.cartProducts.filter((item) =>
						productCartIds.includes(item.cartId),
					)

					productsToRemove.forEach((prod) => {
						if (prod.isSelected) {
							state.selectedItems -= 1
							state.totalSelectedPrice -= prod.volume * (prod.price ?? 0)
						}
					})

					return {
						cartProducts: state.cartProducts.filter(
							(item) => !productCartIds.includes(item.cartId),
						),
					}
				})
			},

			editCartProduct: async (productCartId, newVolume, newInventory) => {
				let updatedProduct: ProductCart

				const productToUpdate = get().cartProducts.find((item) => item.cartId === productCartId)

				if (!productToUpdate) throw new Error("Produto não encontrado")

				updatedProduct = productToUpdate

				set((state) => {
					if (productToUpdate.isSelected) {
						const price = productToUpdate.price ?? 0
						const oldPrice = price * productToUpdate.volume
						const newPrice = price * newVolume

						state.totalSelectedPrice = state.totalSelectedPrice - oldPrice + newPrice
					}

					updatedProduct = { ...updatedProduct, volume: newVolume, inventory: newInventory }

					return {
						cartProducts: state.cartProducts.map((item) =>
							item.cartId === productCartId
								? { ...item, volume: newVolume, inventory: newInventory }
								: item,
						),
					}
				})

				return updatedProduct
			},

			toggleProductSelection: (productCartId) => {
				set((state) => {
					const productToToggleSelection = state.cartProducts.find(
						(item) => item.cartId === productCartId,
					)

					if (productToToggleSelection) {
						const price = productToToggleSelection.price ?? 0
						state.selectedItems += productToToggleSelection.isSelected ? -1 : 1
						state.totalSelectedPrice += productToToggleSelection.isSelected
							? -productToToggleSelection.volume * price
							: productToToggleSelection.volume * price
					}

					return {
						cartProducts: state.cartProducts.map((item) =>
							item.cartId === productCartId ? { ...item, isSelected: !item.isSelected } : item,
						),
					}
				})
			},

			getSelectedProducts: () => {
				const state = get()
				return state.cartProducts.filter((item) => item.isSelected)
			},

			getSelectedVolume: () => {
				const state = get()
				return state.cartProducts
					.filter((item) => item.isSelected)
					.reduce((acc, item) => acc + item.volume, 0)
			},

			getCartMetadata: async () => ({
				totalItems: get().cartProducts.length,
				totalPrice: get().totalPrice,
			}),
		}),
		{ name: "@cart", storage: createJSONStorage(() => zustandStorage) },
	),
)

export type cartStore = Pick<
	CartStoreType,
	"cartProducts" | "selectedItems" | "totalSelectedPrice" | "totalPrice"
>

export function useCartStoreZustand(): cartStore {
	const cartProducts = useCartStore((state) => state.cartProducts)
	const selectedItems = useCartStore((state) => state.selectedItems)
	const totalSelectedPrice = Math.abs(useCartStore((state) => state.totalSelectedPrice))
	const totalPrice = Math.abs(useCartStore((state) => state.totalPrice))

	return { cartProducts, selectedItems, totalSelectedPrice, totalPrice }
}

export type cartServices = {
	cart: Omit<CartStoreType, "cartProducts" | "selectedItems" | "totalSelectedPrice" | "totalPrice">
}

export function useCartServiceZustand(): cartServices {
	const add = useCartStore((state) => state.add)
	const deleteItem = useCartStore((state) => state.deleteItem)
	const deleteItems = useCartStore((state) => state.deleteItems)
	const editCartProduct = useCartStore((state) => state.editCartProduct)
	const toggleProductSelection = useCartStore((state) => state.toggleProductSelection)
	const getSelectedProducts = useCartStore((state) => state.getSelectedProducts)
	const getSelectedVolume = useCartStore((state) => state.getSelectedVolume)
	const getCartMetadata = useCartStore((state) => state.getCartMetadata)

	return {
		cart: {
			add,
			deleteItem,
			deleteItems,
			editCartProduct,
			toggleProductSelection,
			getSelectedProducts,
			getSelectedVolume,
			getCartMetadata,
		},
	}
}
