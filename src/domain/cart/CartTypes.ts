import { Product } from "../product";

export interface ProductCart extends Product {
  volume: number;
  cartId: number;
}

export type ProductCartVariables = Omit<ProductCart, "cartId">;

export type Cart = {
  totalPrice: number;
  cartProducts: ProductCart[];
  totalItems: number;
};
