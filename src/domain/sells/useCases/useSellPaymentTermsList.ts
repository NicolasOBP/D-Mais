import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellPaymentTermsList(enabled: boolean) {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsPaymentTermsList],
		fetchData: sells.paymentTermsList,
		staleTime: 1000 * 30,
		enabled,
	})
}
