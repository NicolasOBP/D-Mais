import { useQueryClient } from "@tanstack/react-query"

import { type MutationOptions, QueryKeys, useAppMutation, useOrderService, useToast } from "@infra"

export function useOrderRemoveFromStorage(options: MutationOptions<void>) {
	const { removeOrderFromStorage } = useOrderService()
	const queryClient = useQueryClient()
	const { showToast } = useToast()

	return useAppMutation<void, { orderId: number }>({
		mutationFn: ({ orderId }) => removeOrderFromStorage(orderId),
		onSuccess: () => {
			showToast({
				message: "Pedido excluido com sucesso",
				type: "success",
			})
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] })
			options.onSuccess?.()
		},
	})
}
