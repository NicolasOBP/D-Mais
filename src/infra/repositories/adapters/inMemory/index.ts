import { Repositories } from "@domain";

import { InMemoryAuthRepo } from "./InMemoryAuthRepo";

export const InMemoryRepositories: Repositories = {
  auth: new InMemoryAuthRepo(),
};
