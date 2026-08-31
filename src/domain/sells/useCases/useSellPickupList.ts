import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellPickupList() {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsPickupList],
		fetchData: sells.pickupList,
		staleTime: 1000 * 30,
	})
}
