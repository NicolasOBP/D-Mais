import axios from "axios"

import type {
	Client,
	ClientAPIContent,
	Company,
	CompanyAPIContent,
	Driver,
	DriverAPIContent,
	ISellsRepo,
	PaymentMethod,
	PaymentMethodAPIContent,
	PaymentTerms,
	PaymentTermsAPIContent,
	SellsListAPI,
	SendCartAPI,
	SendCartAPIContent,
	SendCartItems,
	TruckPickup,
	TruckPickupAPIContent,
} from "@domain"

import { errorUtils } from "@utils"

import type { ErrorType } from "../APITypes"
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

export class ApiSellRepo
	implements
		Pick<
			ISellsRepo,
			| "clientList"
			| "companyList"
			| "driverList"
			| "paymentMethodsList"
			| "paymentTermsList"
			| "sendCart"
			| "truckPickupList"
		>
{
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
			if (error instanceof Error && !axios.isAxiosError(error)) {
				throw error
			}

			if (axios.isAxiosError<ErrorType>(error)) {
				const errorMessage = errorUtils.getErrorMessage(error.message)
				if (errorMessage !== error.message) {
					throw new Error(errorMessage, {
						cause: `O servidor de vendas retornou um erro ao listar ${listName} (HTTP ${error.response?.status}).`,
					})
				}

				const serverResult = error.response?.data.result[0]
				if (serverResult && serverResult.STATUS !== "OK") {
					throw new Error(serverResult.MENSAGEM || `Não foi possível listar ${listName}.`)
				}

				if (error.response) {
					throw new Error(
						`O servidor de vendas retornou um erro ao listar ${listName} (HTTP ${error.response.status}).`,
						{ cause: error.message },
					)
				}

				throw new Error(`Não foi possível conectar ao servidor para listar ${listName}.`, {
					cause: error.message,
				})
			}

			throw error
		}
	}

	async clientList(): Promise<Client[]> {
		return this.list<ClientAPIContent, Client>(
			"TMetodosGerais/F_ListarClientes",
			"clientes",
			(client) => ({
				name: client.C_NMFANT,
				corporateReason: client.C_RAZSO,
				cnpjCpf: client.C_RGCLI,
			}),
		)
	}

	async truckPickupList(valueToSearch: string): Promise<TruckPickup[]> {
		return this.list<TruckPickupAPIContent, TruckPickup>(
			"TMetodosGerais/F_ListarCaminhoes",
			"caminhões e carretas",
			(vehicle) => ({ licensePlate: vehicle.C_PLACA, id: vehicle.C_RGCLI + vehicle.C_PLACA }),
			{ filtro: valueToSearch },
		)
	}

	// TODO: verify if C_RGCLI is the right move
	async driverList(): Promise<Driver[]> {
		return this.list<DriverAPIContent, Driver>(
			"TMetodosGerais/F_ListarMotoristas",
			"motoristas",
			(driver) => ({
				name: driver.C_NMFANT,
				cpf: driver.C_RGCLI,
			}),
		)
	}

	async companyList(): Promise<Company[]> {
		return this.list<CompanyAPIContent, Company>(
			"TMetodosGerais/F_ListarTransportadoras",
			"transportadoras",
			(company) => ({
				name: company.C_NMFANT,
				cnpj: company.C_RGCLI,
			}),
		)
	}

	async paymentTermsList(): Promise<PaymentTerms[]> {
		return this.list<PaymentTermsAPIContent, PaymentTerms>(
			"TMetodosGerais/F_ListarCondPagto",
			"condições de pagamento",
			(paymentTerms) => ({
				id: paymentTerms.CODIGO,
				description: paymentTerms.DIAS,
				table: paymentTerms.TABELA,
			}),
		)
	}

	async paymentMethodsList(): Promise<PaymentMethod[]> {
		return this.list<PaymentMethodAPIContent, PaymentMethod>(
			"TMetodosGerais/F_ListarFormaPagto",
			"formas de pagamento",
			(paymentMethod) => ({
				id: paymentMethod.CAM1,
				description: paymentMethod.CAM2,
			}),
		)
	}

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
