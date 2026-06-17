import { ProductCart } from "../cart";
import { Client, Company, Driver, Pickup, Truck } from "../sells";

export type OrdersStatus = "pending" | "completed" | "cancelled";

export interface Order {
  id: number;
  products: Pick<ProductCart, "cartId" | "title" | "volume">[];
  client: Client;
  status: OrdersStatus;
  totalPrice: string;
}

export interface OrderDetails extends Order {
  paymentTerms: string;
  table: string;
  fare: string;
  truck: Truck;
  pickup: Pickup;
  driver: Driver;
  company: Company;
}

export type OrderVariables = Omit<OrderDetails, "id" | "status">;
