import axios from "axios"

import type { IProductRepo, Product, ProductAPI } from "@domain"

import { errorUtils } from "@utils"

import type { ErrorType } from "../APITypes"
import { API } from "../apiConfig"

import { adaptFuelResultToProduct } from "./ProductAdapter"

export class ApiProductRepo implements IProductRepo {
	async list(searchProduct: string | null): Promise<Product[]> {
		try {
			const response = await API.get<ProductAPI>("TMetodosGerais/F_ListarCombustiveis")
			const responseData = response.data

			if (responseData.result.length === 0) {
				throw new Error("O servidor retornou uma lista de combustíveis inválida.")
			}

			const products = responseData.result[0].map(adaptFuelResultToProduct)

			if (!searchProduct) {
				return products
			}

			return products.filter((product) =>
				product.title.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase()),
			)
		} catch (error) {
			if (axios.isAxiosError<ErrorType>(error)) {
				const errorMessage = errorUtils.getErrorMessage(error.message)
				if (errorMessage !== error.message) {
					throw new Error(errorMessage, {
						cause: `O servidor de combustíveis retornou um erro (HTTP ${error.response?.status}).`,
					})
				}

				const serverResult = error.response?.data.result[0]

				if (serverResult && serverResult.STATUS !== "OK") {
					throw new Error(serverResult.MENSAGEM || "Não foi possível listar combustíveis.")
				}

				if (error.response) {
					throw new Error(
						`O servidor de combustíveis retornou um erro (HTTP ${error.response.status}).`,
						{ cause: error.message },
					)
				}

				throw new Error("Não foi possível conectar ao servidor de combustíveis.", {
					cause: error.message,
				})
			}

			throw error
		}
	}
}
