import { type MutationOptions, useAppMutation, useCartService, useRepository } from "@infra"

import type { PaymentTerms, TablePrices } from "../SellsType"

export function useSellPaymentTermsControl(options?: MutationOptions<TablePrices>) {
	const { sells } = useRepository()
	const { updateTotalSelectedPrice } = useCartService()

	return useAppMutation<TablePrices, PaymentTerms>({
		mutationFn: (paymentTerms) => sells.paymentTermsControl(paymentTerms),
		onSuccess: (data) => {
			updateTotalSelectedPrice(data.price)
			options?.onSuccess?.(data)
		},
	})
}
