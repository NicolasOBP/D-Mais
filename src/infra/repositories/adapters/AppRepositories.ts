import type { Repositories } from "@domain"

import { ApiAuthRepo } from "./api/auth/ApiAuthRepo"
import { ApiInventoryRepo } from "./api/inventory/ApiInventoryRepo"
import { ApiOrdersRepo } from "./api/orders/ApiOrdersRepo"
import { ApiProductRepo } from "./api/product/ApiProductRepo"
import { ApiSellRepo } from "./api/sell/ApiSellRepo"

const apiSellRepo = new ApiSellRepo()

export const AppRepositories: Repositories = {
	auth: new ApiAuthRepo(),
	product: new ApiProductRepo(),
	sells: {
		calcFinalOrderPrice: (variables) => apiSellRepo.calcFinalOrderPrice(variables),
		sendCart: (items) => apiSellRepo.sendCart(items),
		truckPickupList: (valueToSearch) => apiSellRepo.truckPickupList(valueToSearch),
		companyList: (valueToSearch) => apiSellRepo.companyList(valueToSearch),
		driverList: (valueToSearch) => apiSellRepo.driverList(valueToSearch),
		paymentMethodsList: () => apiSellRepo.paymentMethodsList(),
		paymentTermsList: () => apiSellRepo.paymentTermsList(),
		clientList: (valueToSearch) => apiSellRepo.clientList(valueToSearch),
	},
	orders: new ApiOrdersRepo(),
	inventory: new ApiInventoryRepo(),
}
