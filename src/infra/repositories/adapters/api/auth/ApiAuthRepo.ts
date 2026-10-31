import type { AuthAPI, AuthUser, IAuthRepo } from "@domain"

import { API } from "../apiConfig"
import { handleApiError } from "../apiError"

import { adaptLoginResultToAuthUser, adaptSignInRequest } from "./AuthAdapter"

export class ApiAuthRepo implements IAuthRepo {
	private authUser: AuthUser | null = null

	async signIn(company: string, password: string, userName: string): Promise<AuthUser> {
		try {
			const response = await API.put<AuthAPI>(
				"TMetodosGerais/F_Login",
				adaptSignInRequest(company, password, userName),
			)

			const loginResult = response.data.result[0]
			if (!loginResult) {
				throw new Error("O servidor retornou uma resposta de login inválida.")
			}

			if (loginResult.STATUS !== "OK") {
				throw new Error(loginResult.MENSAGEM || "Não foi possível autenticar o usuário.")
			}

			const authUser = adaptLoginResultToAuthUser(loginResult, userName)
			this.authUser = authUser

			return authUser
		} catch (error) {
			handleApiError(error, {
				fallbackServerMessage: "Não foi possível autenticar o usuário.",
				connectionErrorMessage: "Não foi possível conectar ao servidor de login.",
				httpErrorMessage: (status) => `O servidor de login retornou um erro (HTTP ${status}).`,
				translatedErrorCause: (status) =>
					`O servidor de combustíveis retornou um erro (HTTP ${status}).`,
			})
		}
	}

	async getUserById(userId: string | null): Promise<AuthUser | null> {
		if (!userId || this.authUser?.id !== userId) {
			return null
		}

		return this.authUser
	}

	async signOut(): Promise<void> {
		this.authUser = null
	}

	async checkLeftQuota(): Promise<void> {
		throw new Error("A verificação de quota ainda não foi integrada ao servidor.")
	}

	async updateLeftQuota(): Promise<void> {
		throw new Error("A atualização de quota ainda não foi integrada ao servidor.")
	}
}
