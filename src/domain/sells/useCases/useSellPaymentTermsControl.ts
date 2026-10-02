import {
	type MutationOptions,
	useAppMutation,
	useOrderService,
	useRepository,
	useToast,
} from "@infra"

import type { PaymentTerms, TablePrices } from "../SellsType"

export function useSellPaymentTermsControl(options?: MutationOptions<TablePrices>) {
	const { sells } = useRepository()
	const { showToast } = useToast()
	const { updateOrderTotalPrice } = useOrderService()

	return useAppMutation<TablePrices, PaymentTerms>({
		mutationFn: (paymentTerms) => sells.paymentTermsControl(paymentTerms),
		onSuccess: (data) => {
			updateOrderTotalPrice(data.price)
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			showToast({ message: error.message, type: "error" })
			options?.onError?.(error.message)
		},
	})
}
