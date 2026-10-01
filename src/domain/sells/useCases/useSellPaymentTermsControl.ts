import {
	type MutationOptions,
	useAppMutation,
	useCartService,
	useRepository,
	useToast,
} from "@infra"

import type { PaymentTerms, TablePrices } from "../SellsType"

export function useSellPaymentTermsControl(options?: MutationOptions<TablePrices>) {
	const { sells } = useRepository()
	const { showToast } = useToast()
	const { updateTotalSelectedPrice } = useCartService()

	return useAppMutation<TablePrices, PaymentTerms>({
		mutationFn: (paymentTerms) => sells.paymentTermsControl(paymentTerms),
		onSuccess: (data) => {
			updateTotalSelectedPrice(data.price)
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			showToast({ message: error.message, type: "error" })
			options?.onError?.(error.message)
		},
	})
}
