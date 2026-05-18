import { Product } from "../product";

export interface ProductCart extends Product {
  volume: number;
  cartId: number;
}

export type ProductCartVariables = Omit<ProductCart, "cartId">;
export type CartMetadata = Omit<Cart, "cartProducts">;

export type Cart = {
  cartProducts: ProductCart[];
  totalPrice: number;
  totalItems: number;
};
