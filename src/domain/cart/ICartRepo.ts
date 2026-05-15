import { Cart, ProductCart, ProductCartVariables } from "./CartTypes";

export interface ICartRepo {
  add: (product: ProductCartVariables) => Promise<ProductCart>;
  totalItems: () => Promise<number | null>;
  getCart: () => Promise<Cart>;
  getCartItems: () => Promise<ProductCart[]>;
  editVolume: (
    productCartId: ProductCart["cartId"],
    newVolume: number,
  ) => Promise<ProductCart>;
  deleteItem: (productCartId: ProductCart["cartId"]) => Promise<void>;
}
