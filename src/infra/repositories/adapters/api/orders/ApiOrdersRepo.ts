import axios from "axios"

import type {
	AuthUser,
	CreateOrderAPI,
	CreateOrderAPIContent,
	CreateOrderResult,
	IOrdersRepo,
	Order,
	OrderListAPI,
	OrderListAPIContent,
	OrderVariables,
} from "@domain"

import { errorUtils, idUtils } from "@utils"

import { API } from "../apiConfig"

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null
}

function adaptOrderListResult(item: OrderListAPIContent): Order {
	const status = item.status.toLocaleUpperCase()
	const orderStatus =
		status === "ENVIADO"
			? "completed"
			: status === "PENDENTE"
				? "pending"
				: status === "CANCELADO"
					? "cancelled"
					: null

	if (!orderStatus) {
		throw new Error("O servidor retornou um status inválido ao listar pedidos.")
	}

	return {
		id: item.c_idrec,
		client: { name: item.c_nmfant },
		totalPrice: item.c_vltotal,
		status: orderStatus,
		products: item.itens.map((item) => {
			return {
				cartId: idUtils.generateId(),
				title: item.c_desc,
				volume: item.c_qtven,
			}
		}),
	}
}

function parseCreateOrderResult(result: CreateOrderAPIContent | string): CreateOrderAPIContent {
	let parsedResult: unknown = result

	if (typeof result === "string") {
		try {
			parsedResult = JSON.parse(result)
		} catch (error) {
			throw new Error("O servidor retornou uma resposta inválida ao enviar o pedido.", {
				cause: error,
			})
		}
	}

	if (typeof parsedResult !== "object" || parsedResult === null || !("STATUS" in parsedResult)) {
		throw new Error("O servidor retornou uma resposta inválida ao enviar o pedido.")
	}

	const status = parsedResult.STATUS
	const message = "MENSAGEM" in parsedResult ? parsedResult.MENSAGEM : undefined

	if (typeof status !== "string" || (message !== undefined && typeof message !== "string")) {
		throw new Error("O servidor retornou uma resposta inválida ao enviar o pedido.")
	}

	const id = "IDREC" in parsedResult ? parsedResult.IDREC : undefined
	const finalValue = "VALOR_FINAL" in parsedResult ? parsedResult.VALOR_FINAL : undefined

	if (
		(id !== undefined && typeof id !== "string") ||
		(finalValue !== undefined && (typeof finalValue !== "number" || !Number.isFinite(finalValue)))
	) {
		throw new Error("O servidor retornou dados inválidos ao enviar o pedido.")
	}

	return { STATUS: status, IDREC: id, VALOR_FINAL: finalValue, MENSAGEM: message }
}

export class ApiOrdersRepo implements Pick<IOrdersRepo, "list" | "send"> {
	async list(authUser: AuthUser): Promise<Order[]> {
		try {
			const response = await API.get<OrderListAPI>("TMetodosGerais/F_ListarPedidos", {
				params: { cdempr: authUser.id },
			})

			const result = response.data?.result?.[0]
			if (!Array.isArray(result)) {
				throw new Error("O servidor retornou uma lista de pedidos inválida.")
			}

			return result.map(adaptOrderListResult)
		} catch (error) {
			if (error instanceof Error && !axios.isAxiosError(error)) {
				throw error
			}

			if (axios.isAxiosError(error)) {
				const errorMessage = errorUtils.getErrorMessage(error.message)
				if (errorMessage !== error.message) {
					throw new Error(errorMessage, {
						cause: `O servidor de pedidos retornou um erro (HTTP ${error.response?.status}).`,
					})
				}

				if (error.response) {
					throw new Error(
						`O servidor de pedidos retornou um erro (HTTP ${error.response.status}).`,
						{ cause: error.message },
					)
				}

				throw new Error("Não foi possível conectar ao servidor de pedidos.", {
					cause: error.message,
				})
			}

			throw error
		}
	}

	async send(order: OrderVariables, authUser: AuthUser): Promise<CreateOrderResult> {
		try {
			const response = await API.put<CreateOrderAPI>("TMetodosGerais/F_Cria_Pedido", {
				C_POSTO: authUser.company,
				C_CHAPA: authUser.id,
				C_CDEMPR: authUser.id,
				C_RGCLI: order.client.rg,
				C_CONDPAGTO: order.paymentTerms.id,
				C_TPFRETE: order.fareSelected ? "1" : "2",
				C_TPPAGTO: order.paymentMethod.id,
				C_PLACA: order.truck.licensePlate,
				C_PLACA_B: order.pickup?.licensePlate ?? "",
				C_RGENT: order.driver.rg,
				C_RGAUX: order.company.rg,
				C_ITENS: order.products.map((product) => ({
					C_CDPRO: product.id,
					C_CDEST: product.inventory.id,
					C_QTVEN: product.volume,
				})),
			})

			const result = response.data.result[0]
			if (!result) {
				throw new Error("O servidor retornou uma resposta vazia ao enviar o pedido.")
			}

			const parsedResult = parseCreateOrderResult(result)
			if (parsedResult.STATUS !== "OK") {
				throw new Error(parsedResult.MENSAGEM || "Não foi possível enviar o pedido.")
			}

			if (typeof parsedResult.IDREC !== "string" || typeof parsedResult.VALOR_FINAL !== "number") {
				throw new Error("O servidor retornou dados incompletos ao enviar o pedido.")
			}

			return {
				STATUS: "OK",
				IDREC: parsedResult.IDREC,
				VALOR_FINAL: parsedResult.VALOR_FINAL,
			}
		} catch (error) {
			if (error instanceof Error && !axios.isAxiosError(error)) {
				throw error
			}

			if (axios.isAxiosError<CreateOrderAPI>(error)) {
				const errorMessage = errorUtils.getErrorMessage(error.message)
				if (errorMessage !== error.message) {
					throw new Error(errorMessage, {
						cause: `O servidor de pedidos retornou um erro (HTTP ${error.response?.status}).`,
					})
				}

				const errorResult = error.response?.data.result[0]
				if (errorResult) {
					const parsedError = parseCreateOrderResult(errorResult)
					if (parsedError.STATUS !== "OK") {
						throw new Error(
							errorUtils.getErrorMessage(parsedError.MENSAGEM) ||
								"Não foi possível enviar o pedido.",
						)
					}
				}

				if (error.response) {
					throw new Error(
						`O servidor de pedidos retornou um erro (HTTP ${error.response.status}).`,
						{ cause: error.message },
					)
				}

				throw new Error("Não foi possível conectar ao servidor de pedidos.", {
					cause: error.message,
				})
			}

			throw error
		}
	}
}
