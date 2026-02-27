import { Schema, model, Document, Types } from "mongoose";

interface CartItem {
  foodId: Types.ObjectId;
  quantity: number;
  priceAtTimeAdded: number;
}

export interface Cart extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
}

const cartSchema = new Schema<Cart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: "Food" },
        quantity: Number,
        priceAtTimeAdded: Number
      }
    ]
  },
  { timestamps: true }
);

export const Cart = model<Cart>("Cart", cartSchema);