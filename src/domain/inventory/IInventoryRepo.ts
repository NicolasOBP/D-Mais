import type { Inventory } from "./InventoryTypes"

export interface IInventoryRepo {
	list: () => Promise<Inventory[]>
}
