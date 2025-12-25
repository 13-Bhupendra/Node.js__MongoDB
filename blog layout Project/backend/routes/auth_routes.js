import express from "express";
import { signIn, signUp } from "../controller/auth_controller.js";
import { checkAuthReq } from "../middleware/auth_middleware.js";

const router = express.Router()

router.post("/signup" , checkAuthReq , signUp);
router.post("/signin" , signIn);

export default router;