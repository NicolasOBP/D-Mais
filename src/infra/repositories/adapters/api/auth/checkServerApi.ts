import axios from "axios"

import { API } from "../apiConfig"

const LOGIN_ENDPOINT = "TMetodosGerais/F_Login"
const INVALID_SERVER_CONFIG_MESSAGE = "Configuração do servidor inválida."

function isLoginBusinessError(data: unknown): boolean {
	if (typeof data !== "object" || data === null || !("result" in data)) {
		return false
	}

	const result = data.result
	if (!Array.isArray(result) || typeof result[0] !== "object" || result[0] === null) {
		return false
	}

	const loginResult = result[0]
	return (
		"STATUS" in loginResult &&
		typeof loginResult.STATUS === "string" &&
		loginResult.STATUS !== "OK" &&
		"MENSAGEM" in loginResult &&
		typeof loginResult.MENSAGEM === "string" &&
		loginResult.MENSAGEM.trim().length > 0
	)
}

export async function checkServerApi(): Promise<void> {
	try {
		const response = await API.put(LOGIN_ENDPOINT)
		if (isLoginBusinessError(response.data)) {
			return
		}
	} catch (error) {
		if (axios.isAxiosError(error) && isLoginBusinessError(error.response?.data)) {
			return
		}

		throw new Error(INVALID_SERVER_CONFIG_MESSAGE, {
			cause: error instanceof Error ? error.message : error,
		})
	}

	throw new Error(INVALID_SERVER_CONFIG_MESSAGE)
}
