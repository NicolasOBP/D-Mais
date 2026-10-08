import type { IInventoryRepo } from "@domain"

import axios from "axios"

import { API } from "../apiConfig"

import { adaptInventoryResult } from "./InventoryAdapter"
import { inventoryResponseSchema } from "./inventorySchema"

export class ApiInventoryRepo implements Pick<IInventoryRepo, "listInventories"> {
	async listInventories(productCode: string) {
		let responseData: unknown

		try {
			const response = await API.put<unknown>("TMetodosGerais/F_ListarEstoques", {
				C_CDPRO: productCode,
			})

			responseData = response.data
		} catch (error) {
			if (axios.isAxiosError(error)) {
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

		const parsedResponse = inventoryResponseSchema.safeParse(responseData)

		if (!parsedResponse.success || parsedResponse.data.result.length === 0) {
			throw new Error("O servidor retornou uma lista de estoques inválida.")
		}

		return parsedResponse.data.result[0].map(adaptInventoryResult)
	}
}
