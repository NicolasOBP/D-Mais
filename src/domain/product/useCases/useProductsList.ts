import { useQuery } from "@tanstack/react-query";

import { QueryKeys, useRepository } from "@infra";

export function useProductsList(searchDebounced: string) {
  const { product } = useRepository();

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: [QueryKeys.ProductList, searchDebounced],
    queryFn: () => product.list(searchDebounced),
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
