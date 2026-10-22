import type { InventoryWithoutProducts } from "./InventoryTypes"

export interface IInventoryRepo {
	listInventories: (productCode: string) => Promise<InventoryWithoutProducts[]>
}
