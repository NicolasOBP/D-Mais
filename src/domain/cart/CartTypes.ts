import { Product } from "../product";

export interface ProductCart extends Product {
  volume: number;
}

export type Cart = {
  totalPrice: number;
  cartProducts: (ProductCart & { cartId: number })[];
};
