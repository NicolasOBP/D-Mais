import type { Repositories } from "@domain"

import { InMemoryAuthRepo } from "./InMemoryAuthRepo"
import { InMemoryInventoryRepo } from "./InMemoryInventoryRepo"
import { InMemoryOrdersRepo } from "./InMemoryOrdersRepo"
import { InMemoryProductRepo } from "./InMemoryProductRepo"
import { InMemorySellsRepo } from "./InMemorySellsRepo"

export const InMemoryRepositories: Repositories = {
	auth: new InMemoryAuthRepo(),
	product: new InMemoryProductRepo(),
	sells: new InMemorySellsRepo(),
	orders: new InMemoryOrdersRepo(),
	inventory: new InMemoryInventoryRepo(),
}
