import { AppError } from "utils/error-utils";
import { FoodRepository } from "../repositories/food.repository";
import { StatusCodes } from "http-status-codes";


const foodRepo = new FoodRepository();

export class FoodService {

    async getAllFoods() {
        return foodRepo.get();
    }

    async addFood(data: {
        name: string;
        description: string;
        price: number;
    }) {
        if (!data.name || !data.price) {
        throw new AppError(
            "Name and price are required",
            StatusCodes.BAD_REQUEST,
            "INVALID_FOOD_DATA"
        );
        }

        return foodRepo.create(data);
    }

    async updateAvailability(id: string, isAvailable: boolean) {
        const food = await foodRepo.getById(id);

        if (!food) {
        throw new AppError(
            "Food not found", 
            StatusCodes.NOT_FOUND, 
            "FOOD_NOT_FOUND"
        );
        }

        return foodRepo.updateAvailability(id, isAvailable);
    }
}