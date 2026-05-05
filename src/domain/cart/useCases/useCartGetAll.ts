import { useQuery } from "@tanstack/react-query";

import { QueryKeys, useRepository } from "@infra";

export function useCartGetAll() {
  const { cart } = useRepository();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [QueryKeys.CartList],
    queryFn: () => cart.getCart(),
    staleTime: 1000 * 30,
  });

  return {
    cart: data,
    isLoading,
    isError,
    isFetching,
  };
}
