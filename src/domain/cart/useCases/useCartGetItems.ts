import { QueryKeys, useAppQuery, useRepository } from "@infra";

export function useCartGetItems() {
  const { cart } = useRepository();

  return useAppQuery({
    queryKey: [QueryKeys.Cart, QueryKeys.CartList],
    fetchData: cart.getCartItems,
  });
}
