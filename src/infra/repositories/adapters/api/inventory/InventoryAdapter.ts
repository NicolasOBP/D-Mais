import type { InventoryResult } from "./inventorySchema"

export function adaptInventoryResult(inventory: InventoryResult) {
	return {
		id: inventory.C_CODESTOQUE,
		description: inventory.C_DESCESTOQUE,
	}
}
