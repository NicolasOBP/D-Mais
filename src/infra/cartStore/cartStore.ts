import { create } from "zustand"

import type { ICartRepo, ProductCartScreen } from "@domain"

import { idUtils } from "@utils"

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
		updateProductPrices: (products: { cartId: number; price: number; totalPrice: number }[]) => void
		setSelectedTotalPrice: (totalPrice: number) => void
	}

const cartStore = create<CartStoreType>()(
	persist(
		(set, get) => ({
			...initialState,

			add: async (product) => {
				set((state) => {
					const existingProduct = state.cartProducts.find(
						(item) => item.id === product.id && item.inventory.id === product.inventory.id,
					)

					if (existingProduct) {
						const previousTotal = existingProduct.totalPrice
						const nextTotal = product.totalPrice

						const previousVolume = existingProduct.volume
						const nextVolue = product.volume

						state.totalSelectedPrice += existingProduct.isSelected ? nextTotal : 0

						Object.assign(existingProduct, {
							totalPrice: previousTotal + nextTotal,
							volume: previousVolume + nextVolue,
						})

						return {
							cartProducts: state.cartProducts,
						}
					}

					const newProductCart: ProductCartScreen = {
						...product,
						isSelected: true,
						cartId: idUtils.generateId(),
					}

					state.selectedItems += 1
					state.totalSelectedPrice += product.totalPrice

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
						state.totalSelectedPrice -= productToRemove.totalPrice
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
							state.totalSelectedPrice -= prod.totalPrice
						}
					})

					return {
						cartProducts: state.cartProducts.filter(
							(item) => !productCartIds.includes(item.cartId),
						),
					}
				})
			},

			editCartProduct: async (productCartId, newVolume, newInventory, newPrice, newTotalPrice) => {
				let updatedProduct: ProductCartScreen

				const productToUpdate = get().cartProducts.find((item) => item.cartId === productCartId)

				if (!productToUpdate) throw new Error("Produto não encontrado")

				updatedProduct = productToUpdate

				set((state) => {
					if (productToUpdate.isSelected) {
						const oldPrice = productToUpdate.totalPrice
						const updatedTotalPrice = newTotalPrice

						state.totalSelectedPrice = state.totalSelectedPrice - oldPrice + updatedTotalPrice
					}

					updatedProduct = {
						...updatedProduct,
						volume: newVolume,
						inventory: newInventory,
						price: newPrice,
						totalPrice: newTotalPrice,
					}

					return {
						cartProducts: state.cartProducts.map((item) =>
							item.cartId === productCartId ? updatedProduct : item,
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
						const total = productToToggleSelection.totalPrice

						state.selectedItems += productToToggleSelection.isSelected ? -1 : 1
						state.totalSelectedPrice += productToToggleSelection.isSelected ? -total : total
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

			updateProductPrices: (products) => {
				set((state) => {
					const pricesByCartId = new Map(products.map((product) => [product.cartId, product]))
					const cartProducts = state.cartProducts.map((product) => {
						const updatedPrice = pricesByCartId.get(product.cartId)

						return updatedPrice
							? { ...product, price: updatedPrice.price, totalPrice: updatedPrice.totalPrice }
							: product
					})

					return {
						cartProducts,
						totalSelectedPrice: cartProducts
							.filter((product) => product.isSelected)
							.reduce(
								(total, product) =>
									total + (product.totalPrice ?? product.volume * (product.price ?? 0)),
								0,
							),
					}
				})
			},

			setSelectedTotalPrice: (totalPrice) => set({ totalSelectedPrice: totalPrice }),

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
	const cartProducts = cartStore((state) => state.cartProducts)
	const selectedItems = cartStore((state) => state.selectedItems)
	const totalSelectedPrice = Math.abs(cartStore((state) => state.totalSelectedPrice))
	const totalPrice = Math.abs(cartStore((state) => state.totalPrice))

	return { cartProducts, selectedItems, totalSelectedPrice, totalPrice }
}

export type cartServices = {
	cart: Omit<CartStoreType, "cartProducts" | "selectedItems" | "totalSelectedPrice" | "totalPrice">
}

export function useCartServiceZustand(): cartServices {
	const add = cartStore((state) => state.add)
	const deleteItem = cartStore((state) => state.deleteItem)
	const deleteItems = cartStore((state) => state.deleteItems)
	const editCartProduct = cartStore((state) => state.editCartProduct)
	const toggleProductSelection = cartStore((state) => state.toggleProductSelection)
	const getSelectedProducts = cartStore((state) => state.getSelectedProducts)
	const updateProductPrices = cartStore((state) => state.updateProductPrices)
	const setSelectedTotalPrice = cartStore((state) => state.setSelectedTotalPrice)
	const getSelectedVolume = cartStore((state) => state.getSelectedVolume)
	const getCartMetadata = cartStore((state) => state.getCartMetadata)

	return {
		cart: {
			add,
			deleteItem,
			deleteItems,
			editCartProduct,
			toggleProductSelection,
			getSelectedProducts,
			getSelectedVolume,
			updateProductPrices,
			setSelectedTotalPrice,
			getCartMetadata,
		},
	}
}
