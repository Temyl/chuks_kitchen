import { OrderStatus } from "internals/enums";
import { Schema, model, Document, Types } from "mongoose";


export interface Order extends Document {
  userId: Types.ObjectId;
  items: {
    foodId: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
}

const orderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: "Food" },
        quantity: Number,
        priceAtPurchase: Number
      }
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    }
  },
  { timestamps: true }
);

export const Order = model<Order>("Order", orderSchema);