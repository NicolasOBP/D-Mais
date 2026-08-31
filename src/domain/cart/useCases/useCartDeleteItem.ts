import { useQueryClient } from "@tanstack/react-query"

import {
	type MutationOptions,
	QueryKeys,
	useAppMutation,
	useCartService,
	useRepository,
} from "@infra"

import { useToast } from "@components"

import type { ProductCart } from ".."

export function useCartDeleteItem(options?: MutationOptions<ProductCart["cartId"]>) {
	const { cart } = useRepository()
	const { showToast } = useToast()
	const queryClient = useQueryClient()
	const { removeProductFromCart } = useCartService()

	return useAppMutation<ProductCart["cartId"], { productCartId: ProductCart["cartId"] }>({
		mutationFn: (prod) => cart.deleteItem(prod.productCartId),
		onSuccess: (productCartId) => {
			showToast({
				type: "success",
				message: "Produto deletado!",
				duration: 1000,
			})

			removeProductFromCart(productCartId)

			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Cart],
			})

			options?.onSuccess?.(productCartId)
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
			})
		},
	})
}
