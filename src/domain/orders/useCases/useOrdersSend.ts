import { useQueryClient } from "@tanstack/react-query"

import {
	type MutationOptions,
	QueryKeys,
	useAppMutation,
	useAuth,
	useCartService,
	useRepository,
	useToast,
} from "@infra"

import { errorUtils } from "@utils"

import type { CreateOrderResult, OrderVariables } from "../OrdersType"

export function useOrdersSend(options?: MutationOptions<CreateOrderResult, OrderVariables>) {
	const { orders } = useRepository()
	const { authUser } = useAuth()
	const { showToast } = useToast()
	const queryClient = useQueryClient()
	const { cart } = useCartService()

	return useAppMutation<CreateOrderResult, OrderVariables>({
		mutationFn: (order) => {
			if (!authUser) {
				throw new Error("Usuário não autenticado.")
			}

			return orders.send(order, authUser)
		},
		onSuccess: (result, order) => {
			showToast({
				type: "success",
				message: "Pedido enviado com sucesso!",
			})

			if (authUser?.leftQuota) {
				authUser.leftQuota -= order.products.reduce((acc, prod) => acc + prod.volume, 0)
			}

			cart.deleteItems(order.products.map((prod) => prod.cartId))

			queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] })
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] })

			options?.onSuccess?.(result, order)
		},
		onError: (error) => {
			options?.onError?.(errorUtils.getErrorMessage(error.message))
		},
	})
}
