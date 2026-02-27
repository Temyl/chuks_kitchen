import { Role } from "internals/enums";
import { Schema, model, Document } from "mongoose";

export interface User extends Document {
  password: string;
  email?: string;
  phone?: string;
  referralCode?: string;
  isVerified: boolean;
  otp?: string;
  otpExpiresAt?: Date;
  role: Role;
}

const userSchema = new Schema<User>(
  {
    password: { type: String, required: true },

    email: {
      type: String,
      unique: true,
      sparse: true
    },

    phone: {
      type: String,
      unique: true,
      sparse: true
    },

    referralCode: {
      type: String
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    otp: {
      type: String
    },

    otpExpiresAt: {
      type: Date
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER
    }
  },
  { timestamps: true }
);

export const User = model<User>("User", userSchema);