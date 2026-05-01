import { Cart, ICartRepo, ProductCart } from "@domain";

let InnerCart: Cart = { cartProducts: [], totalPrice: 0, totalItems: 0 };

export class InMemoryCartRepo implements ICartRepo {
  async add(product: ProductCart): Promise<ProductCart> {
    const productCart = { ...product, cartId: InnerCart.cartProducts.length };

    InnerCart.cartProducts.push(productCart);
    InnerCart.totalItems++;
    InnerCart.totalPrice = Number(
      (InnerCart.totalPrice + productCart.price * productCart.volume).toFixed(
        2,
      ),
    );

    return productCart;
  }
  async totalItems(): Promise<number | null> {
    return InnerCart.totalItems > 0 ? InnerCart.totalItems : null;
  }
}
