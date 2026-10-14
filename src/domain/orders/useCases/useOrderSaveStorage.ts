import { useQueryClient } from "@tanstack/react-query"

import {
	type MutationOptions,
	QueryKeys,
	useAppMutation,
	useCartService,
	useOrderService,
	useOrderStore,
	useToast,
} from "@infra"

export function useOrderSaveStorage(options?: MutationOptions<void>) {
	const { cart } = useCartService()
	const { products } = useOrderStore()
	const { saveOrderInStorage } = useOrderService()
	const { showToast } = useToast()
	const queryClient = useQueryClient()

	return useAppMutation<void, void>({
		mutationFn: saveOrderInStorage,
		onSuccess: () => {
			cart.deleteItems(products.map((prod) => prod.cartId))

			queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] })
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Orders],
			})
			options?.onSuccess?.()
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
			})
		},
	})
}
