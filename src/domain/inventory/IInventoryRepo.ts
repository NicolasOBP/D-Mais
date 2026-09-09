import type { Inventory, InventoryWithoutProducts } from "./InventoryTypes"

export interface IInventoryRepo {
	listFullInventories: () => Promise<Inventory[]>
	listInventories: () => Promise<InventoryWithoutProducts[]>
}
