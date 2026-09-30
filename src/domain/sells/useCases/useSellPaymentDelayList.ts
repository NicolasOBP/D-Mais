import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellPaymentDelayList() {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsPaymentDelayList],
		fetchData: sells.paymentTermsList,
		staleTime: 1000 * 30,
	})
}
