import type {
	Client,
	Company,
	Driver,
	PaymentDelay,
	PaymentMethod,
	Pickup,
	Truck,
} from "./SellsType"

export interface ISellsRepo {
	clientList: () => Promise<Client[]>
	truckList: () => Promise<Truck[]>
	pickupList: () => Promise<Pickup[]>
	driverList: () => Promise<Driver[]>
	companyList: () => Promise<Company[]>
	paymentDelayList: () => Promise<PaymentDelay[]>
	paymentMethodsList: () => Promise<PaymentMethod[]>
	fareControl: (isFareSelected: boolean) => Promise<number>
}
