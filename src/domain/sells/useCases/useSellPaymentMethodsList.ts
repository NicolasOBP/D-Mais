import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellPaymentMethodsList(enabled: boolean) {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsPaymentMethodsList],
		fetchData: sells.paymentMethodsList,
		staleTime: 1000 * 30,
		enabled,
	})
}
