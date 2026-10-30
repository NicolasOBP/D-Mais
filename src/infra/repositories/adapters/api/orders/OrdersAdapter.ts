import type {
	AuthUser,
	CreateOrderAPIContent,
	CreateOrderResult,
	Order,
	OrderListAPIContent,
	OrderVariables,
} from "@domain"

import { idUtils } from "@utils"

export function adaptOrderListRequest(authUser: AuthUser) {
	return { params: { cdempr: authUser.id } }
}

export function adaptCreateOrderRequest(order: OrderVariables, authUser: AuthUser) {
	return {
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
	}
}

export function adaptOrderListResult(item: OrderListAPIContent): Order {
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
		products: item.itens.map((product) => ({
			cartId: idUtils.generateId(),
			title: product.c_desc,
			volume: product.c_qtven,
		})),
	}
}

export function parseCreateOrderResult(result: unknown): CreateOrderAPIContent {
	let parsedResult = result

	if (typeof parsedResult === "string") {
		try {
			parsedResult = JSON.parse(parsedResult) as unknown
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

export function adaptCreateOrderResult(result: unknown): CreateOrderResult {
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
}

export function getCreateOrderApiErrorMessage(responseData: unknown): string | undefined {
	if (typeof responseData !== "object" || responseData === null || !("result" in responseData)) {
		return undefined
	}

	const results = responseData.result
	if (!Array.isArray(results) || results.length === 0 || !results[0]) {
		return undefined
	}

	const result = parseCreateOrderResult(results[0])
	return result.STATUS === "OK" ? undefined : result.MENSAGEM || "Não foi possível enviar o pedido."
}
