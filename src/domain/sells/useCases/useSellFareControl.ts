import { type MutationOptions, useAppMutation, useRepository, useToast } from "@infra"

export function useSellFareControl(options?: MutationOptions<number>) {
	const { sells } = useRepository()
	const { showToast } = useToast()

	return useAppMutation<number, { isFareSelected: boolean }>({
		mutationFn: ({ isFareSelected }) => sells.fareControl(isFareSelected),
		onSuccess(price) {
			options?.onSuccess?.(price)
		},
		onError(error) {
			showToast({ message: error.message, type: "error" })
			options?.onError?.(error.message)
		},
	})
}
