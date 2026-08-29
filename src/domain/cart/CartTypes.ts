import { Inventory } from "../inventory";
import { Product } from "../product";

export interface ProductCart extends Product {
  volume: number;
  inventory: Inventory;
  cartId: number;
}
export interface ProductCartScreen extends ProductCart {
  isSelected: boolean;
}

export type ProductCartVariables = Omit<ProductCart, "cartId">;
export type CartMetadata = Omit<Cart, "cartProducts">;

export type Cart = {
  cartProducts: ProductCart[];
  totalPrice: number;
  totalItems: number;
};
