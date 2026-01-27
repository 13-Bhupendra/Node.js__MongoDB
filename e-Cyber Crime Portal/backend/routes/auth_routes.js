import express from "express"
import { signin , signup , signout, changePassword, resetForgetPassword} from "../controller/auth_Controller.js"
import { validateSignupReq , validateSigninReq, verifyToken, validateChangePassword} from "../middleware/auth_Middleware.js"
import { verifyOTP, verifyOTPForCreatePassword } from "../controller/otp_Controller.js";
import { OtpAndNewPasswordValidation, otpSendLimiter, validateOtpVerifyReq } from "../middleware/otp_Middleware.js";

const router = express.Router()

router.post("/api/signup" , validateSignupReq , signup);
router.post("/api/signin" , validateSigninReq ,otpSendLimiter, signin);
router.post("/api/otp/verify" ,validateOtpVerifyReq,  verifyOTP)
router.post("/api/changePassword" , validateChangePassword , changePassword)
router.post("/api/reset/forgetPassword" ,otpSendLimiter , resetForgetPassword)
router.post("/api/otp/verify/create/newPassword" ,OtpAndNewPasswordValidation ,  verifyOTPForCreatePassword)
router.post("/api/signout" , signout)

router.get("/api/me" , verifyToken , (req , res)=>{
    res.json({
        status : true,
        user : req.user
    })
})
export default router;
