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
	clientList: () => Promise<Client[]>
	truckPickupList: (valueToSearch: string) => Promise<TruckPickup[]>
	driverList: () => Promise<Driver[]>
	companyList: () => Promise<Company[]>
	paymentTermsList: () => Promise<PaymentTerms[]>
	paymentMethodsList: () => Promise<PaymentMethod[]>
	calcFinalOrderPrice: (variables: CalcFinalOrderVariables) => Promise<FinalOrderPriceResult>
}
