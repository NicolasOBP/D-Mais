import { QueryKeys, useAppQuery, useRepository } from "@infra";

export function useProductsList(searchDebounced: string) {
  const { product } = useRepository();

  return useAppQuery({
    queryKey: [QueryKeys.ProductList, searchDebounced],
    fetchData: () => product.list(searchDebounced),
    staleTime: 1000 * 30,
  });
}
