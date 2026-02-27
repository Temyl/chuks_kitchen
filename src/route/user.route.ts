import express from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "services/user.service";


const router = express.Router();
const userService = new UserService();

// Signup (email/phone + password)
router.post("/signup", async (req, res) => {
  try {
    const user = await userService.signup(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "OTP sent successfully",
      userId: user._id
    });
  } catch (err: any) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});

// Verify OTP
router.post("/verify", async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const verifiedUser = await userService.verify(userId, otp);
    res.status(StatusCodes.OK).json({
      message: "User verified successfully",
      user: verifiedUser
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});


export default router;