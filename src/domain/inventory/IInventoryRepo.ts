import type { Inventory, InventoryWithoutProducts } from "./InventoryTypes"

export interface IInventoryRepo {
	listFullInventories: () => Promise<Inventory[]>
	listInventories: (productCode: string) => Promise<InventoryWithoutProducts[]>
}
