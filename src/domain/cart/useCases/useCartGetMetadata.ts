import { QueryKeys, useAppQuery, useCartService } from "@infra"

export function useCartGetMetadata() {
	const { cart } = useCartService()

	return useAppQuery({
		queryKey: [QueryKeys.Cart, QueryKeys.CartMetadata],
		fetchData: cart.getCartMetadata,
	})
}
