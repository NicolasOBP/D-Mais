import type { AuthUser } from "@domain"

import type { LoginResponseResult } from "./authSchema"

export function adaptLoginResultToAuthUser(
	loginResult: LoginResponseResult,
	userName: string,
): AuthUser {
	if (!loginResult.C_CDEMPR || !loginResult.C_POSTO) {
		throw new Error("O servidor retornou dados de sessão incompletos.")
	}

	return {
		id: loginResult.C_CDEMPR,
		company: loginResult.C_POSTO,
		userName,
		message: loginResult.MENSAGEM,
	}
}
