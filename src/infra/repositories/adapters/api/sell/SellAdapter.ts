import type {
	CalcFinalOrderVariables,
	Client,
	ClientAPIContent,
	Company,
	CompanyAPIContent,
	Driver,
	DriverAPIContent,
	FinalOrderPriceResult,
	PaymentMethod,
	PaymentMethodAPIContent,
	PaymentTerms,
	PaymentTermsAPIContent,
	ProductCart,
	ProductPriceResultAPI,
	SendCartAPIContent,
	SendCartItems,
	TruckPickup,
	TruckPickupAPIContent,
} from "@domain"

import { parseProductPrice } from "../product/ProductAdapter"

export function adaptClientResult(client: ClientAPIContent): Client {
	return {
		name: client.C_NMFANT,
		corporateReason: client.C_RAZSO,
		rg: client.C_RGCLI,
	}
}

export function adaptTruckPickupResult(vehicle: TruckPickupAPIContent): TruckPickup {
	return {
		licensePlate: vehicle.C_PLACA,
		id: vehicle.C_RGCLI + vehicle.C_PLACA,
	}
}

export function adaptDriverResult(driver: DriverAPIContent): Driver {
	return {
		name: driver.C_NMFANT,
		rg: driver.C_RGCLI,
	}
}

export function adaptCompanyResult(company: CompanyAPIContent): Company {
	return {
		name: company.C_NMFANT,
		rg: company.C_RGCLI,
	}
}

export function adaptPaymentTermsResult(paymentTerms: PaymentTermsAPIContent): PaymentTerms {
	return {
		id: paymentTerms.CODIGO,
		description: paymentTerms.DIAS,
		table: paymentTerms.TABELA,
	}
}

export function adaptPaymentMethodResult(paymentMethod: PaymentMethodAPIContent): PaymentMethod {
	return {
		id: paymentMethod.CAM1,
		description: paymentMethod.CAM2,
	}
}

export function adaptSendCartRequest(items: SendCartItems) {
	return { C_ITENS: items }
}

export function parseSendCartResult(result: unknown): SendCartAPIContent {
	let parsedResult = result

	if (typeof parsedResult === "string") {
		try {
			parsedResult = JSON.parse(parsedResult) as unknown
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

	return { STATUS: status, MENSAGEM: message }
}

export function getSendCartApiErrorMessage(responseData: unknown): string | undefined {
	if (typeof responseData !== "object" || responseData === null || !("result" in responseData)) {
		return undefined
	}

	const results = responseData.result
	if (!Array.isArray(results) || results.length === 0 || !results[0]) {
		return undefined
	}

	const result = parseSendCartResult(results[0])
	return result.STATUS === "OK"
		? undefined
		: result.MENSAGEM || "Não foi possível enviar o carrinho."
}

export function adaptFinalOrderPriceRequest({
	authUser,
	client,
	isFareSelected,
	paymentTerms,
	requestProducts,
	paymentMethod,
}: CalcFinalOrderVariables) {
	const products = Array.isArray(requestProducts) ? requestProducts : [requestProducts]

	return {
		C_POSTO: authUser.company,
		C_CDEMPR: authUser.id,
		C_RGCLI: client.rg,
		C_CONDPAGTO: paymentTerms.id,
		C_TPPAGTO: paymentMethod.id,
		C_TPFRETE: isFareSelected ? "1" : "2",
		C_ITENS: products.map((item) => ({
			C_CDPRO: item.id,
			C_CDEST: item.inventory.id,
			C_QTVEN: item.volume,
		})),
	}
}

export function adaptFinalOrderPriceResult(
	priceResult: ProductPriceResultAPI,
	productsDetails: ProductCart[],
): FinalOrderPriceResult {
	return {
		orderTotalPrice: parseProductPrice(priceResult.VALOR_TOTAL_PEDIDO),
		farePrice: parseProductPrice(priceResult.ITENS[0].VALOR_UNITARIO_FRETE),
		orderProductItems: priceResult.ITENS.map((item, index) => ({
			...productsDetails[index],
			totalPrice: parseProductPrice(item.VALOR_TOTAL_ITEM),
			price: parseProductPrice(item.VALOR_UNITARIO_FINAL),
		})),
	}
}
