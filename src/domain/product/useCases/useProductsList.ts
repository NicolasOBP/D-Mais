import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryKeys, useRepository } from "@infra";

export function useProductsList(searchDebounced: string) {
  const { product } = useRepository();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: [QueryKeys.ProductList],
    queryFn: () => product.list(searchDebounced),
    staleTime: 1000 * 30,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.ProductList] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounced]);

  return {
    products: data,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
}
