import { User } from "models/user.model";


export class UserRepository {
    async create(data: Partial<User>) {
        return User.create(data);
    }

    async getByEmailOrPhone(
        email?: string, 
        phone?: string
    ) {
        return User.findOne({
        $or: [
            { email }, 
            { phone }
        ]
        });
    }

    async getById(id: string) {
        return User.findById(id);
    }

    async verifyUser(id: string) {
        return User.findByIdAndUpdate(

            id,
            { 
                isVerified: true, 
                otp: null, 
                otpExpiresAt: null 
            },
            { new: true }
        );
    }
}