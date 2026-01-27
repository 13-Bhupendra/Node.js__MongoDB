import express from "express"
import { getUserProfile, updateUserProfile } from "../controller/user_Controller.js"
import { validateUserProfileForm } from "../middleware/user_middleware.js"
import { verifyToken } from "../middleware/auth_Middleware.js"

const router = express.Router()

router.get("/api/profile/details" , verifyToken , getUserProfile);
router.put("/api/update/profile/details" , verifyToken , validateUserProfileForm , updateUserProfile )

export default router