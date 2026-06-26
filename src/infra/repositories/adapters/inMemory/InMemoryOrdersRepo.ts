import { IOrdersRepo, Order, OrderDetails, OrderVariables } from "@domain";

let InnerOrders: OrderDetails[] = [];

export class InMemoryOrdersRepo implements IOrdersRepo {
  async list() {
    return InnerOrders;
  }

  async send(order: OrderVariables): Promise<Order> {
    const newOrder: OrderDetails = {
      id: InnerOrders.length + Math.floor(Math.random() * 1000),
      status: "pending",
      ...order,
    };
    InnerOrders.push(newOrder);

    return newOrder;
  }
}
