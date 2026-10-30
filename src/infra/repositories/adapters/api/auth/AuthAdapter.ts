import type { AuthAPIContent, AuthUser } from "@domain"

export function adaptSignInRequest(company: string, password: string, userName: string) {
	return {
		C_POSTO: company,
		C_RGCLI: userName,
		C_SENHA: password,
	}
}

export function adaptLoginResultToAuthUser(
	loginResult: AuthAPIContent,
	userName: string,
): AuthUser {
	if (!loginResult.C_CDEMPR || !loginResult.C_POSTO) {
		throw new Error("O servidor retornou dados de sessão incompletos.")
	}

	return {
		id: loginResult.C_CDEMPR,
		company: loginResult.C_POSTO,
		userName,
		name: loginResult.C_RAZSO,
	}
}
