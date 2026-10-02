import { useQueryClient } from "@tanstack/react-query"

import {
	type MutationOptions,
	QueryKeys,
	useAppMutation,
	useAuth,
	useCartService,
	useOrderItems,
	useRepository,
	useToast,
} from "@infra"

import type { Order, OrderVariables } from "../OrdersType"

import { useOrderSaveStorage } from "./useOrderSaveStorage"

export function useOrdersSend(options?: MutationOptions<Order>) {
	const { orders, cart, auth } = useRepository()
	const { authUser } = useAuth()
	const { showToast } = useToast()
	const queryClient = useQueryClient()
	const { removeProductsFromCart } = useCartService()
	const { products: orderProducts } = useOrderItems()
	const { mutate: saveOrderInStorage } = useOrderSaveStorage()

	return useAppMutation<Order, OrderVariables>({
		mutationFn: (order) => orders.send(order),
		onSuccess: (order) => {
			showToast({
				type: "success",
				message: "Pedido enviado com sucesso!",
			})

			auth.updateLeftQuota(
				authUser!.id,
				order.products.reduce((acc, prod) => acc + prod.volume, 0),
			)

			cart.deleteItems(order.products.map((prod) => prod.cartId))
			removeProductsFromCart(order.products.map((prod) => prod.cartId))

			queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] })
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] })

			options?.onSuccess?.(order)
		},
		onError: (error) => {
			saveOrderInStorage("save order")

			cart.deleteItems(orderProducts.map((prod) => prod.cartId))
			removeProductsFromCart(orderProducts.map((prod) => prod.cartId))

			queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] })
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] })

			options?.onError?.(error.message)
		},
	})
}
