import { Cart } from "../models/cart.model";

export class CartRepository {
    async getByUserId(userId: string) {
        return Cart.findOne({ userId });
    }

    async create(data: any) {
        return Cart.create(data);
    }

    async save(cart: any) {
        return cart.save();
    }

    async clear(userId: string) {
        return Cart.deleteOne({ 
            userId 
        });
    }
}