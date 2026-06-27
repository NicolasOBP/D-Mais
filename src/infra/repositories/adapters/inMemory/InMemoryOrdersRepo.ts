import { IOrdersRepo, Order, OrderDetails, OrderVariables } from "@domain";

let InnerOrders: OrderDetails[] = [];

const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));
export class InMemoryOrdersRepo implements IOrdersRepo {
  async list(): Promise<OrderDetails[]> {
    await delay();

    return InnerOrders;
  }

  async send(order: OrderVariables): Promise<Order> {
    await delay();

    const newOrder: OrderDetails = {
      id: InnerOrders.length + Math.floor(Math.random() * 1000),
      status: "pending",
      ...order,
    };
    InnerOrders.push(newOrder);

    return newOrder;
  }
}
