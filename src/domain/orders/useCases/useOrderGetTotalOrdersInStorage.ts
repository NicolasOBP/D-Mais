import { QueryKeys, useAppQuery, useOrderService } from "@infra"

export function useOrderGetTotalOrdersInStorage() {
	const { getTotalOrdersInStorage } = useOrderService()

	return useAppQuery({
		queryKey: [QueryKeys.Orders, QueryKeys.OrdersTotalStorageOrders],
		fetchData: getTotalOrdersInStorage,
	})
}
