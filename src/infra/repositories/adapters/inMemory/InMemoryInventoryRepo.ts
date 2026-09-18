import type { IInventoryRepo, Inventory, InventoryWithoutProducts } from "@domain"

import { mockInventory } from "./data/mockInventory"
import { delay } from "./delay"

let inventory: Inventory[] = mockInventory

export class InMemoryInventoryRepo implements IInventoryRepo {
	async listFullInventories(): Promise<Inventory[]> {
		await delay()

		return inventory
	}

	async listInventories(): Promise<InventoryWithoutProducts[]> {
		await delay()

		return inventory.map(({ id, description }) => ({
			id,
			description,
		}))
	}
}
