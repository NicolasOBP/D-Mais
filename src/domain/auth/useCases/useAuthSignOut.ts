import {
	type MutationOptions,
	useAppMutation,
	useAuth,
	useBackToSellService,
	useCartService,
	useOrderService,
	useRepository,
	useToast,
} from "@infra"

export function useAuthSignOut(options?: MutationOptions<void>) {
	const { auth } = useRepository()
	const { removeAuthUser } = useAuth()
	const { resetBackToSell } = useBackToSellService()
	const { cart } = useCartService()
	const { clearOrdersFromStorage } = useOrderService()
	const { showToast } = useToast()

	return useAppMutation<void, void>({
		mutationFn: async () => {
			await Promise.all([cart.clearCart(), clearOrdersFromStorage()])
			resetBackToSell()
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
