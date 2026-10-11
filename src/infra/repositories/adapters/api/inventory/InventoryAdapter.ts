import type { InventoryAPIContent } from "@domain"

export function adaptInventoryResult(inventory: InventoryAPIContent) {
	return {
		id: inventory.C_CODESTOQUE,
		description: inventory.C_DESCESTOQUE,
	}
}
