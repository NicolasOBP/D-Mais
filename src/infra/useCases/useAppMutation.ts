import { type UseMutateAsyncFunction, useMutation } from "@tanstack/react-query"

type UseAppMutationReturn<TData, TVariables> = {
	mutate: (variable: TVariables) => TData | void
	isPending: boolean
	error: { message: string; cause: string | undefined } | null
	status: "error" | "idle" | "pending" | "success"
	mutateAsync: UseMutateAsyncFunction<
		TData,
		{
			message: string
			cause: string | undefined
		},
		TVariables,
		unknown
	>
}

export type UseAppMutationOptions<TData, TVariables = unknown> = {
	onSuccess?: (data: TData, variables: TVariables) => void
	onError?: (data: { message: string; cause: string | undefined }) => void
	errorMessage?: string
	retry?: boolean | number
}

type UseAppMutationParams<TData, TVariables> = {
	mutationFn: (variable: TVariables) => Promise<TData>
} & UseAppMutationOptions<TData, TVariables>

export function useAppMutation<TData, TVariables>({
	mutationFn,
	onError,
	onSuccess,
	retry = false,
}: UseAppMutationParams<TData, TVariables>): UseAppMutationReturn<TData, TVariables> {
	const { mutate, error, isPending, status, mutateAsync } = useMutation({
		mutationFn: mutationFn,
		onSuccess,
		onError,
		retry: retry,
	})

	return { mutate, isPending, error, status, mutateAsync }
}
