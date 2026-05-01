import { ProductCart } from "./CartTypes";

export interface ICartRepo {
  add: (product: ProductCart) => Promise<ProductCart>;
  totalItems: () => Promise<number | null>;
}
