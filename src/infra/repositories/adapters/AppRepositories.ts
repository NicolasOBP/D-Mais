import type { Repositories } from "@domain"

import { ApiAuthRepo } from "./api/auth/ApiAuthRepo"
import { ApiInventoryRepo } from "./api/inventory/ApiInventoryRepo"
import { ApiProductRepo } from "./api/product/ApiProductRepo"
import { ApiSellRepo } from "./api/sell/ApiSellRepo"
import { InMemoryRepositories } from "./inMemory"
import { InMemorySellsRepo } from "./inMemory/InMemorySellsRepo"

const apiInventoryRepo = new ApiInventoryRepo()
const apiSellRepo = new ApiSellRepo()
const inMemorySellRepo = new InMemorySellsRepo()

export const AppRepositories: Repositories = {
	...InMemoryRepositories,
	auth: new ApiAuthRepo(),
	product: new ApiProductRepo(),
	sells: {
		fareControl: inMemorySellRepo.fareControl,
		paymentTermsControl: inMemorySellRepo.paymentTermsControl,
		truckPickupList: (valueToSearch) => apiSellRepo.truckPickupList(valueToSearch),
		companyList: () => apiSellRepo.companyList(),
		driverList: () => apiSellRepo.driverList(),
		paymentMethodsList: () => apiSellRepo.paymentMethodsList(),
		paymentTermsList: () => apiSellRepo.paymentTermsList(),
		clientList: () => apiSellRepo.clientList(),
		sendCart: (items) => apiSellRepo.sendCart(items),
	},
	inventory: {
		...InMemoryRepositories.inventory,
		listInventories: (productCode) => apiInventoryRepo.listInventories(productCode),
	},
}
