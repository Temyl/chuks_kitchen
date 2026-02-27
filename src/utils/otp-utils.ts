import crypto from "crypto";

/**
 * Generate a numeric OTP
 */
export const generateOTP = (length: number = 6): string => {
    const digits = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, digits.length);
        otp += digits[randomIndex];
    }

    return otp;
};

/**
 * Hash OTP using SHA256
 */
export const hashOTP = (otp: string): string => {
    return crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
};

/**
 * Compare plain OTP with hashed OTP
 */
export const compareOTP = (
    plainOTP: string,
    hashedOTP: string
): boolean => {
    const hashedInput = hashOTP(plainOTP);
    return crypto.timingSafeEqual(
        Buffer.from(hashedInput),
        Buffer.from(hashedOTP)
    );
};

/**
 * Generate OTP expiry date
 */
export const getOTPExpiry = (minutes: number = 5): Date => {
    return new Date(Date.now() + minutes * 60 * 1000);
};

/**
 * Check if OTP is expired
 */
export const isOTPExpired = (expiryDate?: Date): boolean => {
    if (!expiryDate) return true;
    return expiryDate.getTime() < Date.now();
};