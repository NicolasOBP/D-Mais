import type {
	Client,
	Company,
	Driver,
	PaymentMethod,
	PaymentTerms,
	Pickup,
	SendCartItems,
	TablePrices,
	Truck,
} from "./SellsType"

export interface ISellsRepo {
	sendCart: (items: SendCartItems) => Promise<void>
	clientList: () => Promise<Client[]>
	truckList: () => Promise<Truck[]>
	pickupList: () => Promise<Pickup[]>
	driverList: () => Promise<Driver[]>
	companyList: () => Promise<Company[]>
	paymentTermsList: () => Promise<PaymentTerms[]>
	paymentMethodsList: () => Promise<PaymentMethod[]>
	fareControl: (isFareSelected: boolean) => Promise<number>
	paymentTermsControl: (paymentTerms: PaymentTerms) => Promise<TablePrices>
}
