import { Repositories } from "@domain";

import { InMemoryAuthRepo } from "./InMemoryAuthRepo";
import { InMemoryCartRepo } from "./InMemoryCartRepo";
import { InMemoryProductRepo } from "./InMemoryProductRepo";

export const InMemoryRepositories: Repositories = {
  auth: new InMemoryAuthRepo(),
  product: new InMemoryProductRepo(),
  cart: new InMemoryCartRepo(),
};
