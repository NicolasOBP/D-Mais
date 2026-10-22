import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellDriverList(enabled: boolean, valueToSearch: string) {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsDriverList, valueToSearch],
		fetchData: () => sells.driverList(valueToSearch),
		staleTime: 1000 * 30,
		enabled,
	})
}
