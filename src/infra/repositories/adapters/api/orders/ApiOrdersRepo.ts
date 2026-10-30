import type {
	AuthUser,
	CreateOrderAPI,
	CreateOrderResult,
	IOrdersRepo,
	Order,
	OrderListAPI,
	OrderVariables,
} from "@domain"

import { API } from "../apiConfig"
import { handleApiError } from "../apiError"

import {
	adaptCreateOrderRequest,
	adaptCreateOrderResult,
	adaptOrderListRequest,
	adaptOrderListResult,
	getCreateOrderApiErrorMessage,
} from "./OrdersAdapter"

export class ApiOrdersRepo implements Pick<IOrdersRepo, "list" | "send"> {
	async list(authUser: AuthUser): Promise<Order[]> {
		try {
			const response = await API.get<OrderListAPI>(
				"TMetodosGerais/F_ListarPedidos",
				adaptOrderListRequest(authUser),
			)

			const orders = response.data?.result?.[0]
			if (!Array.isArray(orders)) {
				throw new Error("O servidor retornou uma lista de pedidos inválida.")
			}

			return orders.map(adaptOrderListResult)
		} catch (error) {
			handleApiError(error, {
				fallbackServerMessage: "Não foi possível listar pedidos.",
				connectionErrorMessage: "Não foi possível conectar ao servidor de pedidos.",
				httpErrorMessage: (status) => `O servidor de pedidos retornou um erro (HTTP ${status}).`,
				translatedErrorCause: (status) =>
					`O servidor de pedidos retornou um erro (HTTP ${status}).`,
			})
		}
	}

	async send(order: OrderVariables, authUser: AuthUser): Promise<CreateOrderResult> {
		try {
			const response = await API.put<CreateOrderAPI>(
				"TMetodosGerais/F_Cria_Pedido",
				adaptCreateOrderRequest(order, authUser),
			)

			const result = response.data.result[0]
			if (!result) {
				throw new Error("O servidor retornou uma resposta vazia ao enviar o pedido.")
			}

			return adaptCreateOrderResult(result)
		} catch (error) {
			handleApiError(error, {
				fallbackServerMessage: "Não foi possível enviar o pedido.",
				connectionErrorMessage: "Não foi possível conectar ao servidor de pedidos.",
				httpErrorMessage: (status) => `O servidor de pedidos retornou um erro (HTTP ${status}).`,
				translatedErrorCause: (status) =>
					`O servidor de pedidos retornou um erro (HTTP ${status}).`,
				getServerErrorMessage: getCreateOrderApiErrorMessage,
				translateServerErrorMessage: true,
			})
		}
	}
}
