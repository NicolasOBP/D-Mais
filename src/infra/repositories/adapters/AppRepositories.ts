import type { Repositories } from "@domain"

import { ApiAuthRepo } from "./api/auth/ApiAuthRepo"
import { ApiInventoryRepo } from "./api/inventory/ApiInventoryRepo"
import { ApiProductRepo } from "./api/product/ApiProductRepo"
import { ApiSellRepo } from "./api/sell/ApiSellRepo"
import { InMemoryRepositories } from "./inMemory"

export const AppRepositories: Repositories = {
	...InMemoryRepositories,
	auth: new ApiAuthRepo(),
	product: new ApiProductRepo(),
	sells: new ApiSellRepo(),
	inventory: new ApiInventoryRepo(),
}
