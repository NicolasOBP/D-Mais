import { QueryKeys, useAppQuery, useRepository } from "@infra"

export function useCartGetMetadata() {
	const { cart } = useRepository()

	return useAppQuery({
		queryKey: [QueryKeys.Cart, QueryKeys.CartMetadata],
		fetchData: cart.getCartMetadata,
	})
}
