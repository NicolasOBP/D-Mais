import { Client, ISellsRepo } from "@domain";

import { mockClients } from "./data/mockClients";

export class InMemorySellsRepo implements ISellsRepo {
  async clientList(): Promise<Client[]> {
    return mockClients;
  }
}
