import { SplashScreen } from "expo-router"
import { type PropsWithChildren, createContext, useEffect, useState } from "react"

import type { AuthUser } from "@domain"

import { useRepository } from "../../repositories"
import { authContextStorage } from "../authContextStorage"
import type { AuthState } from "../authCredentialsType"

export const AuthContext = createContext<AuthState>({
	authUser: null,
	isReady: false,
	saveAuthUser: async () => {},
	removeAuthUser: async () => {},
})

SplashScreen.preventAutoHideAsync()

export function AuthProvider({ children }: PropsWithChildren) {
	const [authUser, setAuthUser] = useState<AuthUser | null>(null)
	const [isReady, setIsReady] = useState<boolean>(false)
	const { auth } = useRepository()

	async function saveAuthUser(user: AuthUser) {
		await authContextStorage.set(user.id)
		setAuthUser(user)
	}

	async function removeAuthUser() {
		await authContextStorage.remove()
		setAuthUser(null)
	}

	async function loadAuthUser() {
		try {
			const userId = await authContextStorage.get()
			const user = await auth.getUserById(userId)

			if (user) {
				setAuthUser(user)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsReady(true)
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <just one load>
	useEffect(() => {
		loadAuthUser()
	}, [])

	useEffect(() => {
		if (isReady) {
			SplashScreen.hide()
		}
	}, [isReady])

	return (
		<AuthContext.Provider
			value={{
				authUser,
				isReady,
				saveAuthUser,
				removeAuthUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
