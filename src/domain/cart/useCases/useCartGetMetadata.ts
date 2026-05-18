import { useQuery } from "@tanstack/react-query";

import { QueryKeys, useRepository } from "@infra";

export function useCartGetMetadata() {
  const { cart } = useRepository();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [QueryKeys.Cart, QueryKeys.CartMetadata],
    queryFn: () => cart.getCartMetadata(),
    staleTime: 1000 * 30,
  });

  return {
    cartMetadata: data,
    isLoading,
    isError,
    isFetching,
  };
}
