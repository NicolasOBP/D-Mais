import type { InventoryAPIContent, InventoryWithoutProducts } from "@domain"

export function adaptInventoryResult(inventory: InventoryAPIContent): InventoryWithoutProducts {
	return {
		id: inventory.C_CODESTOQUE,
		description: inventory.C_DESCESTOQUE,
		baseCode: inventory.C_CODBASE,
	}
}
