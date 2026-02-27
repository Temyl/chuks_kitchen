
import { Order } from "../models/order.model";
import { OrderStatus } from "internals/enums";

export class OrderRepository {

  async create(data: Partial<Order>) {
    return Order.create(data);
  }

  async getById(id: string) {
    return Order.findById(id);
  }

  async updateStatus(id: string, status: OrderStatus) {
    return Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }
}