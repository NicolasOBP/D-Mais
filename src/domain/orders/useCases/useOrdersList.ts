import { QueryKeys, useAppQuery, useAuth, useRepository } from "@infra"

export function useOrdersList() {
	const { orders } = useRepository()
	const { authUser } = useAuth()

	return useAppQuery({
		queryKey: [QueryKeys.Orders, QueryKeys.OrdersList, authUser?.id],
		fetchData: () => {
			if (!authUser) {
				throw new Error("Usuário não autenticado.")
			}

			return orders.list(authUser)
		},
		enabled: Boolean(authUser),
	})
}
