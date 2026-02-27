import { StatusCodes } from "http-status-codes";
import {
  generateOTP,
  hashOTP,
  compareOTP,
  isOTPExpired,
  getOTPExpiry
} from "utils/otp-utils";
import { UserRepository } from "../repositories/user.repository";
import { Role } from "internals/enums";
import { AppError } from "utils/error-utils";
import bcrypt from "bcryptjs"; 


const userRepo = new UserRepository();

export class UserService {
  async signup(data: {
    email?: string;
    phone?: string;
    password: string;
  }) {
    if (!data.email && !data.phone) {
      throw new AppError(
        "Email or phone is required",
        StatusCodes.BAD_REQUEST,
        "CONTACT_REQUIRED"
      );
    }

    if (!data.password) {
      throw new AppError(
        "Password is required",
        StatusCodes.BAD_REQUEST,
        "PASSWORD_REQUIRED"
      );
    }

    const existing = await userRepo.getByEmailOrPhone(data.email, data.phone);
    if (existing) {
      throw new AppError(
        "User already exists",
        StatusCodes.CONFLICT,
        "USER_ALREADY_EXISTS"
      );
    }

    const otp = generateOTP();
    const hashedOTP = hashOTP(otp);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepo.create({
      ...data,
      password: hashedPassword,
      otp: hashedOTP,
      otpExpiresAt: getOTPExpiry(5),
      role: Role.CUSTOMER
    });

    console.log("Simulated OTP:", otp);

    return user;
  }

  async verify(userId: string, otp: string) {
    const user = await userRepo.getById(userId);

    if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND, "USER_NOT_FOUND");
    if (!user.otp) throw new AppError("OTP not set", StatusCodes.BAD_REQUEST, "OTP_NOT_SET");
    if (isOTPExpired(user.otpExpiresAt)) throw new AppError("OTP expired", StatusCodes.BAD_REQUEST, "OTP_EXPIRED");

    const isValid = compareOTP(otp, user.otp);
    if (!isValid) throw new AppError("Invalid OTP", StatusCodes.BAD_REQUEST, "INVALID_OTP");

    return userRepo.verifyUser(userId);
  }

  // Login using email/phone + password
  async login(email?: string, phone?: string, password?: string) {
    if (!email && !phone) throw new AppError("Email or phone is required", StatusCodes.BAD_REQUEST, "CONTACT_REQUIRED");
    if (!password) throw new AppError("Password is required", StatusCodes.BAD_REQUEST, "PASSWORD_REQUIRED");

    const user = await userRepo.getByEmailOrPhone(email, phone);
    if (!user) throw new AppError("User not found", StatusCodes.NOT_FOUND, "USER_NOT_FOUND");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Incorrect password", StatusCodes.UNAUTHORIZED, "INVALID_PASSWORD");

    return user;
  }
}