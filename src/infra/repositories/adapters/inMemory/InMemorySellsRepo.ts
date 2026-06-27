import { Client, Company, Driver, ISellsRepo, Pickup, Truck } from "@domain";

import { mockClients } from "./data/mockClients";
import { mockCompanies } from "./data/mockCompanies";
import { mockDrivers } from "./data/mockDrivers";
import { mockPickups } from "./data/mockPickups";
import { mockTrucks } from "./data/mockTrucks";

export class InMemorySellsRepo implements ISellsRepo {
  async clientList(): Promise<Client[]> {
    return mockClients;
  }

  async truckList(): Promise<Truck[]> {
    return mockTrucks;
  }

  async pickupList(): Promise<Pickup[]> {
    return mockPickups;
  }

  async driverList(): Promise<Driver[]> {
    return mockDrivers;
  }

  async companyList(): Promise<Company[]> {
    return mockCompanies;
  }
}
