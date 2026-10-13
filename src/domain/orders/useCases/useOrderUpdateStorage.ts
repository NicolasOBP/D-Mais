import { useQueryClient } from "@tanstack/react-query"

import { type MutationOptions, QueryKeys, useAppMutation, useOrderService, useToast } from "@infra"

import type { OrderDetails, OrderVariables } from "../OrdersType"

export function useOrderUpdateStorage(options?: MutationOptions<OrderVariables>) {
	const { updateOrderInStorage } = useOrderService()
	const queryClient = useQueryClient()
	const { showToast } = useToast()

	return useAppMutation<OrderVariables, OrderDetails>({
		mutationFn: async (order) => {
			await updateOrderInStorage(order)
			const { id, status, ...orderVariables } = order
			return orderVariables
		},
		onSuccess: (orderVariables) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Orders],
			})
			options?.onSuccess?.(orderVariables)
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
			})
			options?.onError?.(error.message)
		},
	})
}
