import { OrderRepository } from "../repositories/order.repository";
import { CartRepository } from "../repositories/cart.repository";
import { FoodRepository } from "../repositories/food.repository";
import { OrderStatus } from "internals/enums";
import { StatusCodes } from "http-status-codes";
import { AppError } from "utils/error-utils";
import { Types } from "mongoose";

const orderRepo = new OrderRepository();
const cartRepo = new CartRepository();
const foodRepo = new FoodRepository();

const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [
    OrderStatus.CONFIRMED,
    OrderStatus.CANCELLED
  ],

  [OrderStatus.CONFIRMED]: [
    OrderStatus.PREPARING,
    OrderStatus.CANCELLED
  ],

  [OrderStatus.PREPARING]: [
    OrderStatus.OUT_OF_DELIVERY
  ],

  [OrderStatus.OUT_OF_DELIVERY]: [
    OrderStatus.COMPLETED
  ],

  [OrderStatus.COMPLETED]: [],

  [OrderStatus.CANCELLED]: []
};

export class OrderService {

  async createOrder(userId: string) {

    const cart = await cartRepo.getByUserId(userId);

    if (!cart || cart.items.length === 0) {
      throw new AppError(
        "Cart is empty",
        StatusCodes.BAD_REQUEST,
        "CART_EMPTY"
      );
    }

    let total = 0;

    for (const item of cart.items) {

      const food = await foodRepo.getById(item.foodId.toString());

      if (!food || !food.isAvailable) {
        throw new AppError(
          "Some items unavailable",
          StatusCodes.BAD_REQUEST,
          "ITEM_UNAVAILABLE"
        );
      }

      total += item.quantity * food.price;
    }

    const order = await orderRepo.create({
      userId: new Types.ObjectId(userId),
      items: cart.items.map(item => ({
        foodId: item.foodId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtTimeAdded
      })),
      totalAmount: total,
      status: OrderStatus.PENDING
    });

    await cartRepo.clear(userId);

    return order;
  }

  async updateStatus(orderId: string, newStatus: OrderStatus) {

    const order = await orderRepo.getById(orderId);

    if (!order) {
      throw new AppError(
        "Order not found",
        StatusCodes.NOT_FOUND,
        "ORDER_NOT_FOUND"
      );
    }

    const allowed = validTransitions[order.status];

    if (!allowed.includes(newStatus)) {
      throw new AppError(
        `Cannot transition from ${order.status} to ${newStatus}`,
        StatusCodes.BAD_REQUEST,
        "INVALID_STATUS_TRANSITION"
      );
    }

    return orderRepo.updateStatus(orderId, newStatus);
  }

  async getOrder(orderId: string) {

    const order = await orderRepo.getById(orderId);

    if (!order) {
      throw new AppError(
        "Order not found",
        StatusCodes.NOT_FOUND,
        "ORDER_NOT_FOUND"
      );
    }

    return order;
  }
}

