import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellPickupList(enabled: boolean) {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsPickupList],
		fetchData: sells.pickupList,
		staleTime: 1000 * 30,
		enabled,
	})
}
