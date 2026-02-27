import { Food } from "models/food.model";


export class FoodRepository {
    async create(data: Partial<Food>) {
        return Food.create(data);
    }

    async get() {
        return Food.find({ isAvailable: true });
    }

    async getById(id: string) {
        return Food.findById(id);
    }

    async updateAvailability(id: string, isAvailable: boolean) {
        return Food.findByIdAndUpdate(
        id,
        { isAvailable },
        { new: true }
        );
    }
}