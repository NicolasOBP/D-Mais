import { type MutationOptions, useAppMutation, useRepository, useToast } from "@infra"

import { errorUtils } from "@utils"

export function useAuthCheckServer(options?: MutationOptions<void>) {
	const { auth } = useRepository()
	const { showToast } = useToast()

	const { error, isPending, mutate } = useAppMutation<void, void>({
		mutationFn: () => auth.checkServer(),
		onSuccess: () => {
			showToast({
				type: "success",
				message: "Configuração do servidor salva com sucesso!",
			})
			options?.onSuccess?.()
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
				description: errorUtils.getErrorMessage(error.cause),
				duration: 4000,
			})
			options?.onError?.(error.message)
		},
	})

	return {
		mutate,
		isPending,
		error,
	}
}
