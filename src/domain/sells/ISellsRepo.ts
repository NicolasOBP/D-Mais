import { Client } from "./SellsType";

export interface ISellsRepo {
  clientList: () => Promise<Client[]>;
}
