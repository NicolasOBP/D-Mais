import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellTruckPickupList(enabled: boolean, valueToSearch: string) {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsTruckPickupList, valueToSearch],
		fetchData: () => sells.truckPickupList(valueToSearch),
		staleTime: 1000 * 30,
		enabled,
	})
}
