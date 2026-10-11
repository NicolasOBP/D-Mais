import axios from "axios"

import type { IInventoryRepo, InventoryAPI } from "@domain"

import { errorUtils } from "@utils"

import type { ErrorType } from "../APITypes"
import { API } from "../apiConfig"

import { adaptInventoryResult } from "./InventoryAdapter"

export class ApiInventoryRepo implements Pick<IInventoryRepo, "listInventories"> {
	async listInventories(productCode: string) {
		try {
			const response = await API.put<InventoryAPI>("TMetodosGerais/F_ListarEstoques", {
				C_CDPRO: productCode,
			})

			if (response.data.result.length === 0) {
				throw new Error("O servidor retornou uma lista de estoques inválida.")
			}

			return response.data.result[0].map(adaptInventoryResult)
		} catch (error) {
			if (error instanceof Error && !axios.isAxiosError(error)) {
				throw error
			}

			if (axios.isAxiosError<ErrorType>(error)) {
				const errorMessage = errorUtils.getErrorMessage(error.message)
				if (errorMessage !== error.message) {
					throw new Error(errorMessage, {
						cause: `O servidor de combustíveis retornou um erro (HTTP ${error.response?.status}).`,
					})
				}

				const serverResult = error.response?.data.result[0]

				if (serverResult && serverResult.STATUS !== "OK") {
					throw new Error(serverResult.MENSAGEM || "Não foi possível listar estoques.")
				}

				if (error.response) {
					throw new Error(
						`O servidor de estoques retornou um erro (HTTP ${error.response.status}).`,
						{ cause: error.message },
					)
				}

				throw new Error("Não foi possível conectar ao servidor de estoques.", {
					cause: error.message,
				})
			}

			throw error
		}
	}
}
