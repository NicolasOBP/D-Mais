import { useQuery } from "@tanstack/react-query";

import { QueryKeys, useRepository } from "@infra";

export function useCartGetAll() {
  const { cart } = useRepository();

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.CartList],
    queryFn: () => cart.getCart(),
  });

  return {
    cart: data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
}
