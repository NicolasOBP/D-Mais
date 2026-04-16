import { useQuery } from "@tanstack/react-query";

import { QueryKeys, useRepository } from "@infra";

export function useProductsList() {
  const { product } = useRepository();

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: [QueryKeys.ProductList],
    queryFn: () => product.list(),
    staleTime: 1000 * 30,
  });

  return {
    products: data,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
}
