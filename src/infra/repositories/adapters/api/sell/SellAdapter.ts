import type { FinalOrderPriceResult, ProductCart, ProductPriceResultAPI } from "@domain"

import { parseProductPrice } from "../product/ProductAdapter"

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
