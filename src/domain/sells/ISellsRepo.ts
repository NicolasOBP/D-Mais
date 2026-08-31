import type { Client, Company, Driver, Pickup, Truck } from "./SellsType"

export interface ISellsRepo {
	clientList: () => Promise<Client[]>
	truckList: () => Promise<Truck[]>
	pickupList: () => Promise<Pickup[]>
	driverList: () => Promise<Driver[]>
	companyList: () => Promise<Company[]>
}
