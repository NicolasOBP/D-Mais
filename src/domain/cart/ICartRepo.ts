import {
  CartMetadata,
  ProductCart,
  ProductCartScreen,
  ProductCartVariables,
} from "./CartTypes";

export interface ICartRepo {
  add: (product: ProductCartVariables) => Promise<ProductCart>;
  getCartItems: () => Promise<ProductCartScreen[]>;
  getCartMetadata: () => Promise<CartMetadata>;
  editVolume: (
    productCartId: ProductCart["cartId"],
    newVolume: number,
  ) => Promise<ProductCart>;
  deleteItem: (
    productCartId: ProductCart["cartId"],
  ) => Promise<ProductCart["cartId"]>;
  deleteItems: (
    productCartIds: ProductCart["cartId"][],
  ) => Promise<ProductCart["cartId"][]>;
}
