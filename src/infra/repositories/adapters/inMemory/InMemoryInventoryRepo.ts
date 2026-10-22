import type { IInventoryRepo, Inventory, InventoryWithoutProducts } from "@domain"

import { mockInventory } from "./data/mockInventory"
import { delay } from "./delay"

let inventory: Inventory[] = mockInventory

export class InMemoryInventoryRepo implements IInventoryRepo {
	async listInventories(productCode: string): Promise<InventoryWithoutProducts[]> {
		await delay()

		return inventory
			.filter(({ products }) => products.some(({ id }) => id === productCode))
			.map(({ id, description, baseCode }) => ({ id, description, baseCode }))
	}
}
