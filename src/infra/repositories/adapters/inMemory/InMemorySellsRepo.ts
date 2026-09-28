import type {
	Client,
	Company,
	Driver,
	ISellsRepo,
	PaymentDelay,
	PaymentMethod,
	Pickup,
	Truck,
} from "@domain"

import { mockClients } from "./data/mockClients"
import { mockCompanies } from "./data/mockCompanies"
import { mockDrivers } from "./data/mockDrivers"
import { mockPaymentDelay } from "./data/mockPaymentDelay"
import { mockPaymentMethods } from "./data/mockPaymentMethods"
import { mockPickups } from "./data/mockPickups"
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

	async paymentDelayList(): Promise<PaymentDelay[]> {
		await delay()

		return mockPaymentDelay
	}

	async paymentMethodsList(): Promise<PaymentMethod[]> {
		await delay()

		return mockPaymentMethods
	}

	async fareControl(isFareSelected: boolean): Promise<number> {
		await delay()

		return isFareSelected ? -10 : 10
	}
}
