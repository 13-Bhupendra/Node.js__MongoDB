import express from "express"
import { getAllUsersData, getUserProfile, updateUserProfile } from "../controller/user_Controller.js"
import { validateUserProfileForm } from "../middleware/user_middleware.js"
import { verifyToken } from "../middleware/auth_Middleware.js"

const router = express.Router()

router.get("/api/getAll/Users" , getAllUsersData);
router.get("/api/userProfile/details" , verifyToken , getUserProfile);
router.put("/api/update/userProfile/details" , verifyToken , validateUserProfileForm , updateUserProfile )

export default router