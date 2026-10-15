import { useQueryClient } from "@tanstack/react-query"

import {
	type MutationOptions,
	QueryKeys,
	useAppMutation,
	useAuth,
	useCartService,
	useRepository,
	useToast,
} from "@infra"

import type { ProductPriceResult } from "../../product"

import type { ProductCartVariables } from ".."

export function useCartAdd(options?: MutationOptions<ProductPriceResult, ProductCartVariables>) {
	const { cart } = useCartService()
	const { authUser } = useAuth()
	const { product } = useRepository()
	const { showToast } = useToast()
	const queryClient = useQueryClient()

	return useAppMutation<ProductPriceResult, ProductCartVariables>({
		mutationFn: async (productToAdd) => {
			if (!authUser) throw new Error("usuário não validado")

			return await product.calcPrice(productToAdd, authUser)
		},
		onSuccess: (priceResult, productToAdd) => {
			showToast({
				type: "success",
				message: "Produto adicionado ao carrinho!",
				duration: 1000,
			})

			const calculatedItem = priceResult.productItems[0]
			cart.add({
				...productToAdd,
				price: calculatedItem.price,
				totalPrice: calculatedItem.totalPrice,
			})

			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Cart],
			})

			options?.onSuccess?.(priceResult, productToAdd)
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
				duration: 3000,
			})
		},
	})
}
