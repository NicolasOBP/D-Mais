import type { Repositories } from "@domain"

import { ApiAuthRepo } from "./api/auth/ApiAuthRepo"
import { ApiInventoryRepo } from "./api/inventory/ApiInventoryRepo"
import { ApiProductRepo } from "./api/product/ApiProductRepo"
import { InMemoryRepositories } from "./inMemory"

const apiInventoryRepo = new ApiInventoryRepo()

export const AppRepositories: Repositories = {
	...InMemoryRepositories,
	auth: new ApiAuthRepo(),
	product: new ApiProductRepo(),
	inventory: {
		...InMemoryRepositories.inventory,
		listInventories: (productCode) => apiInventoryRepo.listInventories(productCode),
	},
}
