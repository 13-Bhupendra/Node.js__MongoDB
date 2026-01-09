import express from "express"
import { getData, signin, signout, signup } from "../controller/authController.js"
import {  verifyOTP } from "../controller/otpController.js"
import { tokenVerificationForProtectRoutes, validateSigninFields, validateSignupFields } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/signup" , validateSignupFields ,  signup)
router.post("/signin" , validateSigninFields ,  signin)
router.post("/otp/verify" , verifyOTP)
router.get("/get" ,tokenVerificationForProtectRoutes , getData)
router.get("/signout" , signout)

export default router;
