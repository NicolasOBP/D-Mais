import { IAuthRepo } from "./auth/IAuthRepo";
import { ICartRepo } from "./cart/ICartRepo";
import { IProductRepo } from "./product/IProductRepo";
import { ISellsRepo } from "./sells/ISellsRepo";

export type Repositories = {
  auth: IAuthRepo;
  product: IProductRepo;
  cart: ICartRepo;
  sells: ISellsRepo;
};
