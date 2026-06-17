import { Order, OrderVariables } from "./OrdersType";

export interface IOrdersRepo {
  list: () => Promise<Order[]>;
  add: (order: OrderVariables) => Promise<void>;
}
