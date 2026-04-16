import { Product } from "./ProductTypes";

export interface IProductRepo {
  list: () => Promise<Product[]>;
}
