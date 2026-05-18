import { useQuery } from "@tanstack/react-query";

import { QueryKeys, useRepository } from "@infra";

export function useCartGetItems() {
  const { cart } = useRepository();

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.Cart, QueryKeys.CartList],
    queryFn: () => cart.getCartItems(),
  });

  return {
    cartItems: data,
    isLoading: isFetching || isLoading,
    isError,
    refetch,
  };
}
