import type { Repositories } from "@domain"

import { ApiAuthRepo } from "./api/auth/ApiAuthRepo"
import { ApiInventoryRepo } from "./api/inventory/ApiInventoryRepo"
import { ApiProductRepo } from "./api/product/ApiProductRepo"
import { ApiSellRepo } from "./api/sell/ApiSellRepo"
import { InMemoryRepositories } from "./inMemory"

const apiSellRepo = new ApiSellRepo()

export const AppRepositories: Repositories = {
	...InMemoryRepositories,
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
	inventory: new ApiInventoryRepo(),
}
