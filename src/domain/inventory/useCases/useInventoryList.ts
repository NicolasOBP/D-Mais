import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useInventoryList(productCode: string) {
	const { inventory } = useRepository()

	const { error, isLoading, refetch, data } = useAppQuery({
		fetchData: () => inventory.listInventories(productCode),
		queryKey: [QueryKeys.Inventory, QueryKeys.InventoryList, productCode],
	})

	return {
		error,
		isLoading,
		refetch,
		inventoryList: data,
	}
}
