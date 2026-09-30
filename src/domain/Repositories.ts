import type { IAuthRepo } from "./auth/IAuthRepo"
import type { ICartRepo } from "./cart/ICartRepo"
import type { IInventoryRepo } from "./inventory"
import type { IOrdersRepo } from "./orders/IOrdersRepo"
import type { IProductRepo } from "./product/IProductRepo"
import type { ISellsRepo } from "./sells/ISellsRepo"

export type Repositories = {
	auth: IAuthRepo
	product: IProductRepo
	cart: ICartRepo
	sells: ISellsRepo
	orders: IOrdersRepo
	inventory: IInventoryRepo
}
