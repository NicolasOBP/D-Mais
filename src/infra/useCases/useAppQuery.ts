import { type UseQueryResult, useQuery } from "@tanstack/react-query"

type UseFetchDataReturn<DataT> = {
	data?: DataT
	isLoading: boolean
	error: unknown
	refetch: UseQueryResult["refetch"]
}

type UseAppQueryParams<DataT> = {
	queryKey: (string | null | undefined | number)[]
	fetchData: () => Promise<DataT>
	staleTime?: number
	enabled?: boolean | (() => boolean)
}

export function useAppQuery<DataT>({
	fetchData,
	queryKey,
	staleTime,
	enabled,
}: UseAppQueryParams<DataT>): UseFetchDataReturn<DataT> {
	const { data, isLoading, error, isPending, refetch, isFetching } = useQuery({
		queryKey,
		queryFn: fetchData,
		staleTime,
		retry: false,
		enabled,
	})

	return {
		data,
		isLoading: isPending || isLoading || isFetching,
		error,
		refetch,
	}
}
