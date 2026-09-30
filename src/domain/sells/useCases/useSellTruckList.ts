import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellTruckList() {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsTruckList],
		fetchData: sells.truckList,
		staleTime: 1000 * 30,
	})
}
