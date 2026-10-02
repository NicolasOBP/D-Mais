import { QueryKeys, useAppQuery, useOrderService } from "@infra"

export function useOrdersListStorage() {
	const { getOrderFromStorage } = useOrderService()

	return useAppQuery({
		queryKey: [QueryKeys.Orders, QueryKeys.OrdersListStorage],
		fetchData: getOrderFromStorage,
	})
}
