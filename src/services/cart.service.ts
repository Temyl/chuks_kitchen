import { StatusCodes } from "http-status-codes";
import { CartRepository } from "../repositories/cart.repository";
import { FoodRepository } from "../repositories/food.repository";
import { AppError } from "utils/error-utils";


const cartRepo = new CartRepository();
const foodRepo = new FoodRepository();

export class CartService {

  async addToCart(
    userId: string,
    foodId: string,
    quantity: number
  ) {
    if (quantity <= 0) {
      throw new AppError(
        "Quantity must be greater than 0",
        StatusCodes.BAD_REQUEST,
        "INVALID_QUANTITY"
      );
    }

    const food = await foodRepo.getById(foodId);

    if (!food || !food.isAvailable) {
      throw new AppError(
        "Food not available",
        400,
        "FOOD_UNAVAILABLE"
      );
    }

    let cart = await cartRepo.getByUserId(userId);

    if (!cart) {
      cart = await cartRepo.create({
        userId,
        items: []
      });
    }

    const existingItem = cart.items.find(
      item => item.foodId.toString() === foodId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        foodId: food._id,
        quantity,
        priceAtTimeAdded: food.price
      });
    }

    return cartRepo.save(cart);
  }

  async clearCart(userId: string) {
    return cartRepo.clear(userId);
  }
}