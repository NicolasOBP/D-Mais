import { useQueryClient } from "@tanstack/react-query"

import { type MutationOptions, QueryKeys, useAppMutation, useCartService, useToast } from "@infra"

import type { ProductCart } from ".."

export function useCartDeleteItem(options?: MutationOptions<void>) {
	const { cart } = useCartService()
	const { showToast } = useToast()
	const queryClient = useQueryClient()

	return useAppMutation<void, { productCartId: ProductCart["cartId"] }>({
		mutationFn: (prod) => cart.deleteItem(prod.productCartId),
		onSuccess: (productCartId) => {
			showToast({
				type: "success",
				message: "Produto deletado!",
				duration: 1000,
			})

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
