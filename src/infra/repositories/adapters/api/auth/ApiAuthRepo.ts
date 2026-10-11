import axios from "axios"

import type { AuthAPI, AuthUser, IAuthRepo } from "@domain"

import { errorUtils } from "@utils"

import { API } from "../apiConfig"

import { adaptLoginResultToAuthUser } from "./AuthAdapter"

export class ApiAuthRepo implements IAuthRepo {
	private authUser: AuthUser | null = null

	async signIn(company: string, password: string, userName: string): Promise<AuthUser> {
		try {
			const response = await API.put<AuthAPI>("TMetodosGerais/F_Login", {
				C_POSTO: company,
				C_RGCLI: userName,
				C_SENHA: password,
			})

			const responseData = response.data

			if (responseData.result.length === 0) {
				throw new Error("O servidor retornou uma resposta de login inválida.")
			}

			const loginResult = responseData.result[0]

			if (loginResult.STATUS !== "OK") {
				throw new Error(loginResult.MENSAGEM || "Não foi possível autenticar o usuário.")
			}

			const authUser = adaptLoginResultToAuthUser(loginResult, userName)

			this.authUser = authUser
			return authUser
		} catch (error) {
			if (error instanceof Error && !axios.isAxiosError(error)) {
				throw error
			}

			if (axios.isAxiosError(error)) {
				const errorMessage = errorUtils.getErrorMessage(error.message)
				if (errorMessage !== error.message) {
					throw new Error(errorMessage, {
						cause: `O servidor de combustíveis retornou um erro (HTTP ${error.response?.status}).`,
					})
				}

				const errorResponse = error.response?.data as AuthAPI | undefined
				const serverResult = errorResponse ? errorResponse.result[0] : undefined

				if (serverResult && serverResult.STATUS !== "OK") {
					throw new Error(serverResult.MENSAGEM || "Não foi possível autenticar o usuário.")
				}

				if (error.response) {
					throw new Error(`O servidor de login retornou um erro (HTTP ${error.response.status}).`, {
						cause: error.message,
					})
				}

				throw new Error("Não foi possível conectar ao servidor de login.", {
					cause: error.message,
				})
			}

			throw error
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
