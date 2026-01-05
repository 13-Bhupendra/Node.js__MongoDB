import express from "express"
import { varifyOtp , sentOtp } from "../controller/OTP_controller.js";

const router = express.Router();

router.post("/api/otp/sent" , sentOtp);
router.post("/api/otp/varify" , varifyOtp);

export default router