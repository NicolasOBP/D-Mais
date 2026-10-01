import type {
	Client,
	Company,
	Driver,
	ISellsRepo,
	PaymentMethod,
	PaymentTerms,
	Pickup,
	TablePrices,
	Truck,
} from "@domain"

import { mockClients } from "./data/mockClients"
import { mockCompanies } from "./data/mockCompanies"
import { mockDrivers } from "./data/mockDrivers"
import { mockPaymentMethods } from "./data/mockPaymentMethods"
import { mockPaymentTerms } from "./data/mockPaymentTerms"
import { mockPickups } from "./data/mockPickups"
import { mockTablePrices } from "./data/mockTablesPrices"
import { mockTrucks } from "./data/mockTrucks"
import { delay } from "./delay"

export class InMemorySellsRepo implements ISellsRepo {
	async clientList(): Promise<Client[]> {
		await delay()

		return mockClients
	}

	async truckList(): Promise<Truck[]> {
		await delay()

		return mockTrucks
	}

	async pickupList(): Promise<Pickup[]> {
		await delay()

		return mockPickups
	}

	async driverList(): Promise<Driver[]> {
		await delay()

		return mockDrivers
	}

	async companyList(): Promise<Company[]> {
		await delay()

		return mockCompanies
	}

	async paymentTermsList(): Promise<PaymentTerms[]> {
		await delay()

		return mockPaymentTerms
	}

	async paymentMethodsList(): Promise<PaymentMethod[]> {
		await delay()

		return mockPaymentMethods
	}

	async fareControl(isFareSelected: boolean): Promise<number> {
		await delay()

		if (Math.random() < 0.5) throw new Error("Erro de servidor")

		return isFareSelected ? -10 : 10
	}

	async paymentTermsControl(paymentTerms: PaymentTerms): Promise<TablePrices> {
		await delay()
		const tablePrices = mockTablePrices.find((item) => item.paymentTermsId === paymentTerms.id)

		if (!tablePrices) throw new Error("Erro ao procurar tabela")

		if (Math.random() < 0.5) throw new Error("Erro de servidor")

		return tablePrices
	}
}
