import express from "express"
import { signin , signup , signout, changePassword, resetForgetPassword} from "../controller/auth_Controller.js"
import { validateSignupReq , validateSigninReq} from "../middleware/auth_Middleware.js"
import { verifyOTP, verifyOTPForCreatePassword } from "../controller/otp_Controller.js";
import { otpSendLimiter, validateOtpVerifyReq } from "../middleware/otp_Middleware.js";

const router = express.Router()

router.post("/api/signup" , validateSignupReq , signup);
router.post("/api/signin" , validateSigninReq ,otpSendLimiter, signin);
router.post("/api/otp/verify" ,validateOtpVerifyReq,  verifyOTP)
router.post("/api/changePassword" , changePassword)
router.post("/api/reset/forgetPassword" , resetForgetPassword)
router.post("/api/otp/verify/create/forgetPassword" , verifyOTPForCreatePassword)

export default router;
