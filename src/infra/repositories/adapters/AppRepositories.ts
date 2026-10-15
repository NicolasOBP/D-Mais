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
		clientList: inMemorySellRepo.clientList,
		companyList: inMemorySellRepo.companyList,
		driverList: inMemorySellRepo.driverList,
		fareControl: inMemorySellRepo.fareControl,
		paymentMethodsList: inMemorySellRepo.paymentMethodsList,
		paymentTermsControl: inMemorySellRepo.paymentTermsControl,
		paymentTermsList: inMemorySellRepo.paymentTermsList,
		pickupList: inMemorySellRepo.pickupList,
		truckList: inMemorySellRepo.truckList,
		sendCart: (items) => apiSellRepo.sendCart(items),
	},
	inventory: {
		...InMemoryRepositories.inventory,
		listInventories: (productCode) => apiInventoryRepo.listInventories(productCode),
	},
}
