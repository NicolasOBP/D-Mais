import axios from "axios"

import type { ISellsRepo, SendCartAPI, SendCartAPIContent, SendCartItems } from "@domain"

import { errorUtils } from "@utils"

import { API } from "../apiConfig"

function parseSendCartResult(result: SendCartAPIContent | string): SendCartAPIContent {
	let parsedResult: unknown = result

	if (typeof result === "string") {
		try {
			parsedResult = JSON.parse(result)
		} catch (error) {
			throw new Error("O servidor retornou uma resposta inválida ao enviar o carrinho.", {
				cause: error,
			})
		}
	}

	if (typeof parsedResult !== "object" || parsedResult === null || !("STATUS" in parsedResult)) {
		throw new Error("O servidor retornou uma resposta inválida ao enviar o carrinho.")
	}

	const status = parsedResult.STATUS
	const message = "MENSAGEM" in parsedResult ? parsedResult.MENSAGEM : undefined

	if (typeof status !== "string" || (message !== undefined && typeof message !== "string")) {
		throw new Error("O servidor retornou uma resposta inválida ao enviar o carrinho.")
	}

	return {
		STATUS: status,
		MENSAGEM: message,
	}
}

export class ApiSellRepo implements Pick<ISellsRepo, "sendCart"> {
	async sendCart(items: SendCartItems): Promise<void> {
		try {
			const response = await API.put<SendCartAPI>("TMetodosGerais/F_Enviar_Carrinho", {
				C_ITENS: items,
			})
			const result = response.data.result[0]

			if (!result) {
				throw new Error("O servidor retornou uma resposta vazia ao enviar o carrinho.")
			}

			const parsedResult = parseSendCartResult(result)

			if (parsedResult.STATUS !== "OK") {
				throw new Error(parsedResult.MENSAGEM || "Não foi possível enviar o carrinho.")
			}
		} catch (error) {
			if (error instanceof Error && !axios.isAxiosError(error)) {
				throw error
			}

			if (axios.isAxiosError<SendCartAPI>(error)) {
				const errorMessage = errorUtils.getErrorMessage(error.message)

				if (errorMessage !== error.message) {
					throw new Error(errorMessage, {
						cause: `O servidor de vendas retornou um erro (HTTP ${error.response?.status}).`,
					})
				}

				const errorResult = error.response?.data.result[0]
				if (errorResult) {
					const parsedError = parseSendCartResult(errorResult)
					if (parsedError.STATUS !== "OK") {
						throw new Error(parsedError.MENSAGEM || "Não foi possível enviar o carrinho.")
					}
				}

				if (error.response) {
					throw new Error(
						`O servidor de vendas retornou um erro (HTTP ${error.response.status}).`,
						{ cause: error.message },
					)
				}

				throw new Error("Não foi possível conectar ao servidor de vendas.", {
					cause: error.message,
				})
			}

			throw error
		}
	}
}
