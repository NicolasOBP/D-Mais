import { IProductRepo, Product } from "@domain";

import { PRODUCTS_DATA } from "./data/products";

const delay = () => new Promise((resolve) => setTimeout(resolve, 4000));

export class InMemoryProductRepo implements IProductRepo {
  async list(searchProduct: string | null): Promise<Product[]> {
    await delay();
    const products = PRODUCTS_DATA;

    if (searchProduct) {
      return products.filter((prod) =>
        prod.title.toLowerCase().includes(searchProduct.toLowerCase()),
      );
    }

    return products;
  }
}
