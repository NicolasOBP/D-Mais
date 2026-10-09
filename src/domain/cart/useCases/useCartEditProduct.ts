import { useQueryClient } from "@tanstack/react-query"

import { type MutationOptions, QueryKeys, useAppMutation, useCartService } from "@infra"

import type { InventoryWithoutProducts } from "../../inventory"
import type { ProductCart } from "../CartTypes"

export function useCartEditProduct(options?: MutationOptions<ProductCart>) {
	const { cart } = useCartService()
	const queryClient = useQueryClient()

	return useAppMutation<
		ProductCart,
		{ productCartId: number; newVolume: number; newInventory: InventoryWithoutProducts }
	>({
		mutationFn: ({ productCartId, newVolume, newInventory }) =>
			cart.editCartProduct(productCartId, newVolume, newInventory),
		onSuccess: (prod) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Cart],
			})

			options?.onSuccess?.(prod)
		},
		onError: (error) => {
			console.log(error)
		},
	})
}
