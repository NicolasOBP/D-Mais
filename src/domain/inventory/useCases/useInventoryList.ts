import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useInventoryList() {
	const { inventory } = useRepository()

	const { error, isLoading, refetch, data } = useAppQuery({
		fetchData: inventory.list,
		queryKey: [QueryKeys.Inventory, QueryKeys.InventoryList],
	})

	return {
		error,
		isLoading,
		refetch,
		inventoryList: data,
	}
}
