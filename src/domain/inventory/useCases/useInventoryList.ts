import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useInventoryList({
	productCode,
	isEnable,
}: {
	productCode: string
	isEnable: boolean
}) {
	const { inventory } = useRepository()

	const { error, isLoading, refetch, data } = useAppQuery({
		fetchData: () => inventory.listInventories(productCode),
		queryKey: [QueryKeys.Inventory, QueryKeys.InventoryList, productCode],
		enabled: isEnable,
	})

	return {
		error,
		isLoading,
		refetch,
		inventoryList: data,
	}
}
