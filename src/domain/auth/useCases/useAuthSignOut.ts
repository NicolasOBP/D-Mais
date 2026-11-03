import { type MutationOptions, useAppMutation, useAuth, useRepository, useToast } from "@infra"

export function useAuthSignOut(options?: MutationOptions<void>) {
	const { auth } = useRepository()
	const { removeAuthUser } = useAuth()
	const { showToast } = useToast()

	return useAppMutation<void, void>({
		mutationFn: async () => {
			await auth.signOut()
			await removeAuthUser()
		},
		onError: (error) => {
			showToast({
				type: "error",
				message: error.message,
			})
			options?.onError?.(error.message)
		},
		onSuccess: () => {
			options?.onSuccess?.()
		},
	})
}
