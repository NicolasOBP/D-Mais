import {
	type MutationOptions,
	useAppMutation,
	useCartService,
	useRepository,
	useToast,
} from "@infra"

export function useSellFareControl(options?: MutationOptions<number>) {
	const { sells } = useRepository()
	const { updateTotalSelectedPrice } = useCartService()
	const { showToast } = useToast()

	return useAppMutation<number, { isFareSelected: boolean }>({
		mutationFn: ({ isFareSelected }) => sells.fareControl(isFareSelected),
		onSuccess(price) {
			updateTotalSelectedPrice(price)
			options?.onSuccess?.(price)
		},
		onError(error) {
			showToast({ message: error.message, type: "error" })
			options?.onError?.(error.message)
		},
	})
}
