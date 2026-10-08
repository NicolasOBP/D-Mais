import type { Repositories } from "@domain"

import { ApiAuthRepo } from "./api/auth/ApiAuthRepo"
import { InMemoryRepositories } from "./inMemory"

export const AppRepositories: Repositories = {
	...InMemoryRepositories,
	auth: new ApiAuthRepo(),
}
