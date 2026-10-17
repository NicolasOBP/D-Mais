export interface MutationOptions<TData, TVariables = unknown> {
	onSuccess?: (data: TData, variables?: TVariables) => void
	onError?: (message: string) => void
	errorMessage?: string
}
