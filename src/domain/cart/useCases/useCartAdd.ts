import { useQueryClient } from "@tanstack/react-query"

import {
	type MutationOptions,
	QueryKeys,
	useAppMutation,
	useCartService,
	useRepository,
} from "@infra"

import { useToast } from "@components"

import type { ProductCart, ProductCartVariables } from ".."

export function useCartAdd(options?: MutationOptions<ProductCart>) {
	const { addProductToCart } = useCartService()
	const { cart } = useRepository()
	const { showToast } = useToast()
	const queryClient = useQueryClient()

	return useAppMutation<ProductCart, ProductCartVariables>({
		mutationFn: (prod) => cart.add(prod),
		onSuccess: (prod) => {
			showToast({
				type: "success",
				message: "Produto adicionado ao carrinho!",
				duration: 1000,
			})

			addProductToCart(prod)

			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Cart],
			})

			options?.onSuccess?.(prod)
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
			})
		},
	})
}
