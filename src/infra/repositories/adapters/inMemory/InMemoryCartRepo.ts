import { Cart, ICartRepo, ProductCart, ProductCartVariables } from "@domain";

let InnerCart: Cart = { cartProducts: [], totalPrice: 0, totalItems: 0 };

export class InMemoryCartRepo implements ICartRepo {
  async add(product: ProductCartVariables): Promise<ProductCart> {
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
  async getCart(): Promise<Cart> {
    return InnerCart;
  }
  async editVolume(
    productCartId: ProductCart["cartId"],
    newVolume: number,
  ): Promise<ProductCart> {
    let itemCart = InnerCart.cartProducts.filter(
      (prod) => prod.cartId === productCartId,
    );

    if (itemCart.length === 0) {
      throw new Error("Product not found in cart");
    }

    const item = itemCart[0];

    if (item.volume === newVolume) {
      return item;
    }

    const oldPrice = item.price * item.volume;
    const newPrice = item.price * newVolume;

    InnerCart.totalPrice = Number(
      (InnerCart.totalPrice - oldPrice + newPrice).toFixed(2),
    );

    if (newVolume === 0) {
      InnerCart.cartProducts = InnerCart.cartProducts.filter(
        (prod) => prod.cartId !== productCartId,
      );
      InnerCart.totalItems--;
    }

    item.volume = newVolume;

    return item;
  }
  async deleteItem(productCartId: ProductCart["cartId"]): Promise<void> {
    const product = InnerCart.cartProducts.find(
      (prod) => prod.cartId === productCartId,
    );

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    const cartInitialLenght = InnerCart.cartProducts.length;

    InnerCart.cartProducts = InnerCart.cartProducts.filter(
      (prod) => prod.cartId !== productCartId,
    );

    const cartCurrentlLenght = InnerCart.cartProducts.length;

    if (cartInitialLenght === cartCurrentlLenght) {
      throw new Error("Erro ao excluir produto");
    }

    InnerCart.totalItems--;
    InnerCart.totalPrice -= product.price * product.volume;
  }
}
