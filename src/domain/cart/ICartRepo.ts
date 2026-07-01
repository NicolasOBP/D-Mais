import { CartMetadata, ProductCart, ProductCartVariables } from "./CartTypes";

export interface ICartRepo {
  add: (product: ProductCartVariables) => Promise<ProductCart>;
  getCartItems: () => Promise<ProductCart[]>;
  getCartMetadata: () => Promise<CartMetadata>;
  editVolume: (
    productCartId: ProductCart["cartId"],
    newVolume: number,
  ) => Promise<ProductCart>;
  deleteItem: (productCartId: ProductCart["cartId"]) => Promise<void>;
  deleteItems: (productCartIds: ProductCart["cartId"][]) => Promise<void>;
}
