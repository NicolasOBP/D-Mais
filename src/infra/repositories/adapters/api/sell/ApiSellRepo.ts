import type {
	CalcFinalOrderVariables,
	Client,
	ClientAPIContent,
	Company,
	CompanyAPIContent,
	Driver,
	DriverAPIContent,
	FinalOrderPriceResult,
	ISellsRepo,
	PaymentMethod,
	PaymentMethodAPIContent,
	PaymentTerms,
	PaymentTermsAPIContent,
	ProductPriceAPI,
	SellsListAPI,
	SendCartAPI,
	SendCartItems,
	TruckPickup,
	TruckPickupAPIContent,
} from "@domain"

import { API } from "../apiConfig"
import { handleApiError } from "../apiError"

import {
	adaptClientResult,
	adaptCompanyResult,
	adaptDriverResult,
	adaptFinalOrderPriceRequest,
	adaptFinalOrderPriceResult,
	adaptPaymentMethodResult,
	adaptPaymentTermsResult,
	adaptSendCartRequest,
	adaptTruckPickupResult,
	getSendCartApiErrorMessage,
	parseSendCartResult,
} from "./SellAdapter"

export class ApiSellRepo implements ISellsRepo {
	private async list<TApiItem, TItem>(
		endpoint: string,
		listName: string,
		adapt: (item: TApiItem) => TItem,
		params?: { filtro: string },
	): Promise<TItem[]> {
		try {
			const response = await API.get<SellsListAPI<TApiItem>>(endpoint, params && { params })
			const result = response.data.result[0]

			if (!Array.isArray(result)) {
				throw new Error(`O servidor retornou uma lista de ${listName} inválida.`)
			}

			return result.map(adapt)
		} catch (error) {
			handleApiError(error, {
				fallbackServerMessage: `Não foi possível listar ${listName}.`,
				connectionErrorMessage: `Não foi possível conectar ao servidor para listar ${listName}.`,
				httpErrorMessage: (status) =>
					`O servidor de vendas retornou um erro ao listar ${listName} (HTTP ${status}).`,
				translatedErrorCause: (status) =>
					`O servidor de vendas retornou um erro ao listar ${listName} (HTTP ${status}).`,
			})
		}
	}

	async clientList(valueToSearch: string): Promise<Client[]> {
		return this.list<ClientAPIContent, Client>(
			"TMetodosGerais/F_ListarClientes",
			"clientes",
			adaptClientResult,
			{ filtro: valueToSearch },
		)
	}

	async truckPickupList(valueToSearch: string): Promise<TruckPickup[]> {
		return this.list<TruckPickupAPIContent, TruckPickup>(
			"TMetodosGerais/F_ListarCaminhoes",
			"caminhões e carretas",
			adaptTruckPickupResult,
			{ filtro: valueToSearch },
		)
	}

	async driverList(valueToSearch: string): Promise<Driver[]> {
		return this.list<DriverAPIContent, Driver>(
			"TMetodosGerais/F_ListarMotoristas",
			"motoristas",
			adaptDriverResult,
			{ filtro: valueToSearch },
		)
	}

	async companyList(valueToSearch: string): Promise<Company[]> {
		return this.list<CompanyAPIContent, Company>(
			"TMetodosGerais/F_ListarTransportadoras",
			"transportadoras",
			adaptCompanyResult,
			{ filtro: valueToSearch },
		)
	}

	async paymentTermsList(): Promise<PaymentTerms[]> {
		return this.list<PaymentTermsAPIContent, PaymentTerms>(
			"TMetodosGerais/F_ListarCondPagto",
			"condições de pagamento",
			adaptPaymentTermsResult,
		)
	}

	async paymentMethodsList(): Promise<PaymentMethod[]> {
		return this.list<PaymentMethodAPIContent, PaymentMethod>(
			"TMetodosGerais/F_ListarFormaPagto",
			"formas de pagamento",
			adaptPaymentMethodResult,
		)
	}

	async sendCart(items: SendCartItems): Promise<void> {
		try {
			const response = await API.put<SendCartAPI>(
				"TMetodosGerais/F_Enviar_Carrinho",
				adaptSendCartRequest(items),
			)

			const result = response.data.result[0]
			if (!result) {
				throw new Error("O servidor retornou uma resposta vazia ao enviar o carrinho.")
			}

			const parsedResult = parseSendCartResult(result)
			if (parsedResult.STATUS !== "OK") {
				throw new Error(parsedResult.MENSAGEM || "Não foi possível enviar o carrinho.")
			}
		} catch (error) {
			handleApiError(error, {
				fallbackServerMessage: "Não foi possível enviar o carrinho.",
				connectionErrorMessage: "Não foi possível conectar ao servidor de vendas.",
				httpErrorMessage: (status) => `O servidor de vendas retornou um erro (HTTP ${status}).`,
				translatedErrorCause: (status) => `O servidor de vendas retornou um erro (HTTP ${status}).`,
				getServerErrorMessage: getSendCartApiErrorMessage,
			})
		}
	}

	async calcFinalOrderPrice(variables: CalcFinalOrderVariables): Promise<FinalOrderPriceResult> {
		const { requestProducts } = variables
		const products = Array.isArray(requestProducts) ? requestProducts : [requestProducts]

		try {
			const response = await API.put<ProductPriceAPI>(
				"TMetodosGerais/F_Calcular_Preco",
				adaptFinalOrderPriceRequest(variables),
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

			return adaptFinalOrderPriceResult(priceResult, products)
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
