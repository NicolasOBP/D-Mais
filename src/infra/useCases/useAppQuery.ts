import { useQuery, UseQueryResult } from "@tanstack/react-query";

type UseFetchDataReturn<DataT> = {
  data?: DataT;
  isLoading: boolean;
  error: unknown;
  refetch: UseQueryResult["refetch"];
};

type UseAppQueryParams<DataT> = {
  queryKey: (string | null | undefined | number)[];
  fetchData: () => Promise<DataT>;
  staleTime?: number;
};

export function useAppQuery<DataT>({
  fetchData,
  queryKey,
  staleTime,
}: UseAppQueryParams<DataT>): UseFetchDataReturn<DataT> {
  const { data, isLoading, error, isPending, refetch, isFetching } = useQuery({
    queryKey,
    queryFn: fetchData,
    staleTime,
  });

  return {
    data,
    isLoading: isPending || isLoading || isFetching,
    error,
    refetch,
  };
}
