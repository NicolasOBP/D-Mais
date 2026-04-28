import { Cart, ICartRepo, ProductCart } from "@domain";

let InnerCart: Cart = { cartProducts: [], totalPrice: 0 };

export class InMemoryCartRepo implements ICartRepo {
  async add(product: ProductCart): Promise<ProductCart> {
    const productCart = { ...product, cartId: InnerCart.cartProducts.length };

    InnerCart.cartProducts.push(productCart);
    InnerCart.totalPrice = Number(
      (InnerCart.totalPrice + productCart.price * productCart.volume).toFixed(
        2,
      ),
    );

    return productCart;
  }
}
