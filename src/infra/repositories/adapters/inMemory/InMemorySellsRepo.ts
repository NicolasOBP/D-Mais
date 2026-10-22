import type {
	Client,
	Company,
	Driver,
	FinalOrderPriceResult,
	ISellsRepo,
	PaymentMethod,
	PaymentTerms,
	SendCartItems,
	TruckPickup,
} from "@domain"

import { mockClients } from "./data/mockClients"
import { mockCompanies } from "./data/mockCompanies"
import { mockDrivers } from "./data/mockDrivers"
import { mockPaymentMethods } from "./data/mockPaymentMethods"
import { mockPaymentTerms } from "./data/mockPaymentTerms"
import { mockPickups } from "./data/mockPickups"
import { mockProducts } from "./data/mockProducts"
import { mockTablePrices } from "./data/mockTablesPrices"
import { mockTrucks } from "./data/mockTrucks"
import { delay } from "./delay"

export class InMemorySellsRepo implements ISellsRepo {
	async sendCart(_items: SendCartItems): Promise<void> {
		await delay()
	}

	async clientList(valueToSearch: string): Promise<Client[]> {
		await delay()

		const search = valueToSearch.toLowerCase()

		if (!search) return mockClients

		return mockClients.filter(({ name, corporateReason, rg }) =>
			`${name} ${corporateReason} ${rg}`.toLowerCase().includes(search),
		)
	}

	async truckPickupList(valueToSearch: string): Promise<TruckPickup[]> {
		await delay()

		const truckPickups = [...mockTrucks, ...mockPickups]
		const search = valueToSearch.toLowerCase()

		if (!search) return truckPickups

		return truckPickups.filter(({ licensePlate }) => licensePlate.toLowerCase().includes(search))
	}

	async driverList(valueToSearch: string): Promise<Driver[]> {
		await delay()

		const search = valueToSearch.toLowerCase()

		if (!search) return mockDrivers

		return mockDrivers.filter(({ name, rg }) => `${name} ${rg}`.toLowerCase().includes(search))
	}

	async companyList(valueToSearch: string): Promise<Company[]> {
		await delay()

		const search = valueToSearch.toLowerCase()

		if (!search) return mockCompanies

		return mockCompanies.filter(({ name, rg }) => `${name} ${rg}`.toLowerCase().includes(search))
	}

	async paymentTermsList(): Promise<PaymentTerms[]> {
		await delay()

		return mockPaymentTerms
	}

	async paymentMethodsList(): Promise<PaymentMethod[]> {
		await delay()

		return mockPaymentMethods
	}

	async calcFinalOrderPrice({
		isFareSelected,
		paymentTerms,
		requestProducts,
	}: Parameters<ISellsRepo["calcFinalOrderPrice"]>[0]): Promise<FinalOrderPriceResult> {
		await delay()

		const products = Array.isArray(requestProducts) ? requestProducts : [requestProducts]
		const orderProductItems = products.map((requestedProduct) => {
			const product = mockProducts.find(({ id }) => id === requestedProduct.id)

			if (product?.price === undefined) {
				throw new Error(`Preço indisponível para o produto ${requestedProduct.id}.`)
			}

			return {
				...requestedProduct,
				price: product.price,
				totalPrice: product.price * requestedProduct.volume,
			}
		})

		const paymentAdjustment =
			mockTablePrices.find(({ paymentTermsId }) => paymentTermsId === paymentTerms.id)?.price ?? 0
		const farePrice = isFareSelected ? 10 : 0
		const productsTotal = orderProductItems.reduce(
			(total, product) => total + product.totalPrice,
			0,
		)

		return {
			orderTotalPrice: productsTotal + paymentAdjustment + farePrice,
			farePrice,
			orderProductItems,
		}
	}
}
