import type { IInventoryRepo, InventoryAPI } from "@domain"

import { API } from "../apiConfig"
import { handleApiError } from "../apiError"

import { adaptInventoryResult, adaptListInventoriesRequest } from "./InventoryAdapter"

export class ApiInventoryRepo implements Pick<IInventoryRepo, "listInventories"> {
	async listInventories(productCode: string) {
		try {
			const response = await API.put<InventoryAPI>(
				"TMetodosGerais/F_ListarEstoques",
				adaptListInventoriesRequest(productCode),
			)

			const inventories = response.data.result[0]
			if (!Array.isArray(inventories)) {
				throw new Error("O servidor retornou uma lista de estoques inválida.")
			}

			return inventories.map(adaptInventoryResult)
		} catch (error) {
			handleApiError(error, {
				fallbackServerMessage: "Não foi possível listar estoques.",
				connectionErrorMessage: "Não foi possível conectar ao servidor de estoques.",
				httpErrorMessage: (status) => `O servidor de estoques retornou um erro (HTTP ${status}).`,
				translatedErrorCause: (status) =>
					`O servidor de combustíveis retornou um erro (HTTP ${status}).`,
			})
		}
	}
}
