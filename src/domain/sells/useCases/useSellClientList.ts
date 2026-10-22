import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellClientList(enabled: boolean, valueToSearch: string) {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsClientList, valueToSearch],
		fetchData: () => sells.clientList(valueToSearch),
		staleTime: 1000 * 30,
		enabled,
	})
}
