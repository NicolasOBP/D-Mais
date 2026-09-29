import { useQueryClient } from "@tanstack/react-query"

import { QueryKeys, useAppMutation, useRepository } from "@infra"

export type OrderManagementAction = {
	id: number
	action: "complete" | "remove"
}

export function useOrdersManage(options?: { onSuccess?: () => void }) {
	const { orders } = useRepository()
	const queryClient = useQueryClient()

	return useAppMutation<void, OrderManagementAction>({
		mutationFn: ({ id, action }) =>
			action === "complete" ? orders.complete(id) : orders.remove(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] })
			options?.onSuccess?.()
		},
	})
}
