import { type MutationOptions, useAppMutation, useAuth, useRepository, useToast } from "@infra"

import type { AuthUser } from "../AuthUser"

interface Variables {
	company: string
	userName: string
	password: string
}

export function useAuthSignIn(options?: MutationOptions<AuthUser>) {
	const { auth } = useRepository()
	const { showToast } = useToast()
	const { saveAuthUser } = useAuth()

	return useAppMutation<AuthUser, Variables>({
		mutationFn: ({ company, password, userName }) => auth.signIn(company, password, userName),
		onSuccess: (authUser) => {
			showToast({
				message: authUser.message ?? `Bem vindo ${authUser.name ?? authUser.userName}`,
				type: "success",
			})
			saveAuthUser(authUser)
			options?.onSuccess?.(authUser)
		},
		onError: (error) => {
			showToast({
				message: error.message,
				type: "error",
				description: error.cause,
				duration: 4000,
			})

			options?.onError?.(error.message)
		},
	})
}
