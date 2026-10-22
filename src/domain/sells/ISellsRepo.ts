import type {
	CalcFinalOrderVariables,
	Client,
	Company,
	Driver,
	FinalOrderPriceResult,
	PaymentMethod,
	PaymentTerms,
	SendCartItems,
	TruckPickup,
} from "./SellsType"

export interface ISellsRepo {
	sendCart: (items: SendCartItems) => Promise<void>
	clientList: (valueToSearch: string) => Promise<Client[]>
	truckPickupList: (valueToSearch: string) => Promise<TruckPickup[]>
	driverList: (valueToSearch: string) => Promise<Driver[]>
	companyList: (valueToSearch: string) => Promise<Company[]>
	paymentTermsList: () => Promise<PaymentTerms[]>
	paymentMethodsList: () => Promise<PaymentMethod[]>
	calcFinalOrderPrice: (variables: CalcFinalOrderVariables) => Promise<FinalOrderPriceResult>
}
