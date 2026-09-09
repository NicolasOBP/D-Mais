import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useInventoryFullList() {
	const { inventory } = useRepository()

	const { error, isLoading, refetch, data } = useAppQuery({
		fetchData: inventory.listFullInventories,
		queryKey: [QueryKeys.Inventory, QueryKeys.InventoryFullList],
	})

	return {
		error,
		isLoading,
		refetch,
		inventoryFullList: data,
	}
}
