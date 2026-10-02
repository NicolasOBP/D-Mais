import {
	type MutationOptions,
	useAppMutation,
	useOrderService,
	useRepository,
	useToast,
} from "@infra"

export function useSellFareControl(options?: MutationOptions<number>) {
	const { sells } = useRepository()
	const { updateOrderTotalPrice } = useOrderService()
	const { showToast } = useToast()

	return useAppMutation<number, { isFareSelected: boolean }>({
		mutationFn: ({ isFareSelected }) => sells.fareControl(isFareSelected),
		onSuccess(price) {
			updateOrderTotalPrice(price)
			options?.onSuccess?.(price)
		},
		onError(error) {
			showToast({ message: error.message, type: "error" })
			options?.onError?.(error.message)
		},
	})
}
