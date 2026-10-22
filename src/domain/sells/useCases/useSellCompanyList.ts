import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useSellCompanyList(enabled: boolean, valueToSearch: string) {
	const { sells } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Sells, QueryKeys.SellsCompanyList, valueToSearch],
		fetchData: () => sells.companyList(valueToSearch),
		staleTime: 1000 * 30,
		enabled,
	})
}
