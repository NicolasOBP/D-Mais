import { type MutationOptions, useAppMutation, useAuth, useRepository, useToast } from "@infra"

export function useAuthCheckLeftQuota(options?: MutationOptions<void>) {
	const { auth } = useRepository()
	const { authUser } = useAuth()
	const { showToast } = useToast()

	const { error, isPending, mutateAsync } = useAppMutation<void, { quota: number }>({
		mutationFn: ({ quota }) => auth.checkLeftQuota(authUser, quota),
		onError: (error) => {
			showToast({
				type: "warning",
				message: error.message,
				description: error.cause,
				duration: 5000,
			})
			options?.onError?.(error.message || "Erro ao verificar a cota restante")
		},
		onSuccess: () => {
			options?.onSuccess?.()
		},
	})

	return {
		checkLeftQuota: async (quota: number) => await mutateAsync({ quota }),
		isPending,
		error,
	}
}
