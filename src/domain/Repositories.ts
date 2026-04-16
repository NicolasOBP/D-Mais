import { IAuthRepo } from "./auth/IAuthRepo";
import { IProductRepo } from "./product/IProductRepo";

export type Repositories = {
  auth: IAuthRepo;
  product: IProductRepo;
};
