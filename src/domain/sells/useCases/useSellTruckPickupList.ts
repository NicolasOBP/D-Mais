import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellTruckPickupList(enabled: boolean) {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsTruckPickupList],
		fetchData: sells.truckPickupList,
		staleTime: 1000 * 30,
		enabled,
	})
}
