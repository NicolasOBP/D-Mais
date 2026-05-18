import {
  Cart,
  CartMetadata,
  ProductCart,
  ProductCartVariables,
} from "./CartTypes";

export interface ICartRepo {
  add: (product: ProductCartVariables) => Promise<ProductCart>;
  getCart: () => Promise<Cart>;
  getCartItems: () => Promise<ProductCart[]>;
  getCartMetadata: () => Promise<CartMetadata>;
  editVolume: (
    productCartId: ProductCart["cartId"],
    newVolume: number,
  ) => Promise<ProductCart>;
  deleteItem: (productCartId: ProductCart["cartId"]) => Promise<void>;
}
