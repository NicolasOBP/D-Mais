import { useQuery } from "@tanstack/react-query";

import { QueryKeys, useRepository } from "@infra";

export function useCartTotalNumber() {
  const { cart } = useRepository();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [QueryKeys.NumberCart],
    queryFn: () => cart.totalItems(),
    staleTime: 1000 * 30,
  });

  return {
    totalItens: data,
    isLoading,
    isError,
    isFetching,
  };
}
