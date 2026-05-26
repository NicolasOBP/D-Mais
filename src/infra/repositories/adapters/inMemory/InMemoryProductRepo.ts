import { IProductRepo, Product } from "@domain";

import { mockProducts } from "./data/mockProducts";

const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));

export class InMemoryProductRepo implements IProductRepo {
  async list(searchProduct: string | null): Promise<Product[]> {
    await delay();
    const products = mockProducts;

    if (searchProduct) {
      return products.filter((prod) =>
        prod.title.toLowerCase().includes(searchProduct.toLowerCase()),
      );
    }

    return products;
  }
}
