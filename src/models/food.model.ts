import { Schema, model, Document } from "mongoose";

export interface Food extends Document {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

const foodSchema = new Schema<Food>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Food = model<Food>("Food", foodSchema);