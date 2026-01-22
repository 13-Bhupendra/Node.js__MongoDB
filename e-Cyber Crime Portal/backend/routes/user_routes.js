import express from "express"
import { updateUserProfile } from "../controller/user_Controller.js"
import { validateUserProfileForm } from "../middleware/user_middleware.js"

const router = express.Router()

router.put("/api/update/profile/details" , validateUserProfileForm , updateUserProfile )

export default router