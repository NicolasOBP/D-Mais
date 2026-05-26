import {
  Cart,
  CartMetadata,
  ICartRepo,
  ProductCart,
  ProductCartVariables,
} from "@domain";

const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));

let InnerCart: Cart = { cartProducts: [], totalPrice: 0, totalItems: 0 };

export class InMemoryCartRepo implements ICartRepo {
  async add(product: ProductCartVariables): Promise<ProductCart> {
    await delay();
    const productCart = {
      ...product,
      cartId: InnerCart.cartProducts.length + Math.random(),
    };

    InnerCart.cartProducts.push(productCart);
    InnerCart.totalItems++;
    InnerCart.totalPrice = Number(
      (InnerCart.totalPrice + productCart.price * productCart.volume).toFixed(
        2,
      ),
    );

    return productCart;
  }

  async getCartMetadata(): Promise<CartMetadata> {
    await delay();
    return {
      totalItems: InnerCart.totalItems,
      totalPrice: InnerCart.totalPrice,
    };
  }

  async getCartItems(): Promise<ProductCart[]> {
    await delay();
    return InnerCart.cartProducts;
  }

  async editVolume(
    productCartId: ProductCart["cartId"],
    newVolume: number,
  ): Promise<ProductCart> {
    await delay();
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
    await delay();
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
