import { QueryKeys, useAppQuery, useAuth, useRepository } from "@infra"

export function useOrderDetails(idrec: string, enabled = true) {
	const { orders } = useRepository()
	const { authUser } = useAuth()

	return useAppQuery({
		queryKey: [QueryKeys.Orders, QueryKeys.OrdersDetails, authUser?.id, idrec],
		fetchData: () => {
			if (!authUser) {
				throw new Error("Usuário não autenticado.")
			}

			return orders.details(idrec, authUser.id)
		},
		enabled: Boolean(authUser && idrec && enabled),
	})
}
