import { Repositories } from "@domain";

import { InMemoryAuthRepo } from "./InMemoryAuthRepo";
import { InMemoryProductRepo } from "./InMemoryProductRepo";

export const InMemoryRepositories: Repositories = {
  auth: new InMemoryAuthRepo(),
  product: new InMemoryProductRepo(),
};
