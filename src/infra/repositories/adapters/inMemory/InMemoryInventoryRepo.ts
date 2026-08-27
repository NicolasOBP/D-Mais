import { IInventoryRepo, Inventory } from "@domain";

import { mockInventory } from "./data/mockInventory";

let inventory: Inventory[] = mockInventory;

export class InMemoryInventoryRepo implements IInventoryRepo {
  async list(): Promise<Inventory[]> {
    return inventory;
  }
}
