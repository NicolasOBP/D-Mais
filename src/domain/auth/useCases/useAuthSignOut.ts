import {
	type MutationOptions,
	useAppMutation,
	useAuth,
	useCartService,
	useOrderService,
	useRepository,
	useToast,
} from "@infra"

export function useAuthSignOut(options?: MutationOptions<void>) {
	const { auth } = useRepository()
	const { removeAuthUser } = useAuth()
	const { cart } = useCartService()
	const { clearOrdersFromStorage } = useOrderService()
	const { showToast } = useToast()

	return useAppMutation<void, void>({
		mutationFn: async () => {
			await Promise.all([cart.clearCart(), clearOrdersFromStorage()])
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
