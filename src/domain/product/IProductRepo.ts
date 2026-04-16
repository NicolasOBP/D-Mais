import { Product } from "./ProductTypes";

export interface IProductRepo {
  list: (searchProduct: string | null) => Promise<Product[]>;
}
