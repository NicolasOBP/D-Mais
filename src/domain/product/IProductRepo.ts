import type { AuthUser } from "../auth"
import type { ProductCartVariables } from "../cart"

import type { Product, ProductPriceResult } from "./ProductTypes"

export interface IProductRepo {
	list: (searchProduct: string | null) => Promise<Product[]>
	calcPrice: (
		requestProducts: ProductCartVariables | ProductCartVariables[],
		authUser: AuthUser,
	) => Promise<ProductPriceResult>
}
