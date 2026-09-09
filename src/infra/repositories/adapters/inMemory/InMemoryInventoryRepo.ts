import type { IInventoryRepo, Inventory, InventoryWithoutProducts } from "@domain"

import { mockInventory } from "./data/mockInventory"

let inventory: Inventory[] = mockInventory

export class InMemoryInventoryRepo implements IInventoryRepo {
	async listFullInventories(): Promise<Inventory[]> {
		return inventory
	}

	async listInventories(): Promise<InventoryWithoutProducts[]> {
		return inventory.map(({ id, description }) => ({
			id,
			description,
		}))
	}
}
