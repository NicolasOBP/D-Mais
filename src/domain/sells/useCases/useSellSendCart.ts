import { type MutationOptions, useAppMutation, useRepository, useToast } from "@infra"

import type { SendCartItems } from "../SellsType"

export function useSellSendCart(options?: MutationOptions<void, SendCartItems>) {
	const { sells } = useRepository()
	const { showToast } = useToast()

	return useAppMutation<void, SendCartItems>({
		mutationFn: (items) => sells.sendCart(items),
		onSuccess: (data, items) => {
			options?.onSuccess?.(data, items)
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
				duration: 4000,
			})
			options?.onError?.(error.message)
		},
	})
}
