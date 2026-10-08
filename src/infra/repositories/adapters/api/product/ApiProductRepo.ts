import type { IProductRepo, Product } from "@domain"

import axios from "axios"

import { API } from "../apiConfig"

import { adaptFuelResultToProduct } from "./ProductAdapter"
import { fuelResponseSchema } from "./productSchema"

export class ApiProductRepo implements IProductRepo {
	async list(searchProduct: string | null): Promise<Product[]> {
		let responseData: unknown

		try {
			const response = await API.get<unknown>("TMetodosGerais/F_ListarCombustiveis")

			responseData = response.data
		} catch (error) {
			if (axios.isAxiosError(error)) {
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

		const parsedResponse = fuelResponseSchema.safeParse(responseData)

		if (!parsedResponse.success) {
			throw new Error("O servidor retornou uma lista de combustíveis inválida.")
		}

		const products = parsedResponse.data.result[0].map(adaptFuelResultToProduct)

		if (!searchProduct) {
			return products
		}

		return products.filter((product) =>
			product.title.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase()),
		)
	}
}
