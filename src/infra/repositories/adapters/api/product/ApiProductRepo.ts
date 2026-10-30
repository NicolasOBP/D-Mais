import type {
	AuthUser,
	IProductRepo,
	Product,
	ProductAPI,
	ProductCartVariables,
	ProductPriceAPI,
	ProductPriceResult,
} from "@domain"

import { API } from "../apiConfig"
import { handleApiError } from "../apiError"

import {
	adaptFuelResultToProduct,
	adaptProductPriceRequest,
	adaptProductPriceResult,
} from "./ProductAdapter"

export class ApiProductRepo implements IProductRepo {
	async list(searchProduct: string | null): Promise<Product[]> {
		try {
			const response = await API.get<ProductAPI>("TMetodosGerais/F_ListarCombustiveis")
			const products = response.data.result[0]

			if (!Array.isArray(products)) {
				throw new Error("O servidor retornou uma lista de combustíveis inválida.")
			}

			const adaptedProducts = products.map(adaptFuelResultToProduct)

			if (!searchProduct) {
				return adaptedProducts
			}

			const normalizedSearch = searchProduct.toLocaleLowerCase()
			return adaptedProducts.filter((product) =>
				product.title.toLocaleLowerCase().includes(normalizedSearch),
			)
		} catch (error) {
			handleApiError(error, {
				fallbackServerMessage: "Não foi possível listar combustíveis.",
				connectionErrorMessage: "Não foi possível conectar ao servidor de combustíveis.",
				httpErrorMessage: (status) =>
					`O servidor de combustíveis retornou um erro (HTTP ${status}).`,
				translatedErrorCause: (status) =>
					`O servidor de combustíveis retornou um erro (HTTP ${status}).`,
			})
		}
	}

	async calcPrice(
		requestProducts: ProductCartVariables | ProductCartVariables[],
		authUser: AuthUser,
	): Promise<ProductPriceResult> {
		const products = Array.isArray(requestProducts) ? requestProducts : [requestProducts]

		try {
			const response = await API.put<ProductPriceAPI>(
				"TMetodosGerais/F_Calcular_Preco",
				adaptProductPriceRequest(authUser, products),
			)

			const priceResult = response.data.result[0]
			if (!priceResult) {
				throw new Error("O servidor retornou uma resposta de preço inválida.")
			}

			if (priceResult.STATUS !== "OK") {
				throw new Error(priceResult.MENSAGEM || "Não foi possível calcular o preço.")
			}

			if (priceResult.ITENS.length !== products.length) {
				throw new Error("O servidor retornou uma quantidade de preços inesperada.")
			}

			return adaptProductPriceResult(priceResult)
		} catch (error) {
			handleApiError(error, {
				fallbackServerMessage: "Não foi possível calcular o preço.",
				connectionErrorMessage: "Não foi possível conectar ao servidor de preços.",
				httpErrorMessage: (status) => `O servidor de preços retornou um erro (HTTP ${status}).`,
				translatedErrorCause: (status) => `O servidor de preços retornou um erro (HTTP ${status}).`,
			})
		}
	}
}
