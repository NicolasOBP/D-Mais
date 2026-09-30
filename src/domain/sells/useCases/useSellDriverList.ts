import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellDriverList() {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsDriverList],
		fetchData: sells.driverList,
		staleTime: 1000 * 30,
	})
}
