import type {
	Client,
	Company,
	Driver,
	PaymentMethod,
	PaymentTerms,
	SendCartItems,
	TablePrices,
	TruckPickup,
} from "./SellsType"

export interface ISellsRepo {
	sendCart: (items: SendCartItems) => Promise<void>
	clientList: () => Promise<Client[]>
	truckPickupList: (valueToSearch: string) => Promise<TruckPickup[]>
	driverList: () => Promise<Driver[]>
	companyList: () => Promise<Company[]>
	paymentTermsList: () => Promise<PaymentTerms[]>
	paymentMethodsList: () => Promise<PaymentMethod[]>
	fareControl: (isFareSelected: boolean) => Promise<number>
	paymentTermsControl: (paymentTerms: PaymentTerms) => Promise<TablePrices>
}
