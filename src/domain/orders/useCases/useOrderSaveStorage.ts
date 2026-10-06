import { useQueryClient } from "@tanstack/react-query"

import { QueryKeys, useAppMutation, useOrderService, useToast } from "@infra"

export function useOrderSaveStorage() {
	const { saveOrderInStorage } = useOrderService()
	const { showToast } = useToast()
	const queryClient = useQueryClient()

	return useAppMutation<void, string>({
		mutationFn: saveOrderInStorage,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Orders],
			})
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
			})
		},
	})
}
