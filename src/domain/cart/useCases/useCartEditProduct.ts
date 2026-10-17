import { useQueryClient } from "@tanstack/react-query"

import type { ProductPriceResult } from "@domain"
import {
	type MutationOptions,
	QueryKeys,
	useAppMutation,
	useAuth,
	useCartService,
	useRepository,
	useToast,
} from "@infra"

import type { InventoryWithoutProducts } from "../../inventory"
import type { ProductCart } from "../CartTypes"

type EditProductVariables = {
	product: ProductCart
	newVolume: number
	newInventory: InventoryWithoutProducts
}

export function useCartEditProduct(options?: MutationOptions<ProductCart>) {
	const { cart } = useCartService()
	const { authUser } = useAuth()

	const { showToast } = useToast()
	const { product } = useRepository()
	const queryClient = useQueryClient()

	return useAppMutation<ProductPriceResult, EditProductVariables>({
		mutationFn: async ({ product: productToEdit, newVolume, newInventory }) => {
			if (!authUser) throw new Error("usuário não validado")

			return await product.calcPrice(
				{
					...productToEdit,
					volume: newVolume,
					inventory: newInventory,
				},
				authUser,
			)
		},
		onSuccess: async (priceResult, { product: productToEdit, newVolume, newInventory }) => {
			const calculatedItem = priceResult.productItems[0]

			const updatedProduct = await cart.editCartProduct(
				productToEdit.cartId,
				newVolume,
				newInventory,
				calculatedItem.price,
				calculatedItem.totalPrice,
			)

			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Cart],
			})

			options?.onSuccess?.(updatedProduct)
		},
		onError: (error) => {
			showToast({
				message: error.message,
				type: "error",
				description: error.cause,
			})
			console.log(error)
		},
	})
}
