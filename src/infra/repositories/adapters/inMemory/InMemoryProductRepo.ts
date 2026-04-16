import { IProductRepo, Product } from "@domain";

import { PRODUCTS_DATA } from "./data/products";

export class InMemoryProductRepo implements IProductRepo {
  async list(searchProduct: string | null): Promise<Product[]> {
    const products = PRODUCTS_DATA;

    if (searchProduct) {
      return products.filter((prod) =>
        prod.title.toLowerCase().includes(searchProduct.toLowerCase()),
      );
    }

    return products;
  }
}
