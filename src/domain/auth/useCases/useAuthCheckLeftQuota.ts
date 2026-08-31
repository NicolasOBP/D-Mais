import { type MutationOptions, useAppMutation, useAuth, useRepository } from "@infra"

import { useToast } from "../../../ui/components/Toast/"

export function useAuthCheckLeftQuota(options?: MutationOptions<void>) {
	const { auth } = useRepository()
	const { authUser } = useAuth()
	const { showToast } = useToast()

	const { error, isPending, mutate } = useAppMutation<void, { quota: number }>({
		mutationFn: ({ quota }) => auth.checkLeftQuota(authUser!.id, quota),
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

	function checkLeftQuota(quota: number) {
		mutate({ quota })
	}

	return {
		checkLeftQuota,
		isPending,
		error,
	}
}
