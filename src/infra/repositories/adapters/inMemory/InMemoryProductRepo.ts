import { IProductRepo, Product } from "@domain";

import { PRODUCTS_DATA } from "./data/products";

export class InMemoryProductRepo implements IProductRepo {
  async list(): Promise<Product[]> {
    const products = PRODUCTS_DATA;

    return products;
  }
}
