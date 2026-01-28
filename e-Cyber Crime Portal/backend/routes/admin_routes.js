import express from "express"
import { getAdminProfile, updateAdminProfile } from "../controller/admin_Controller.js"
import { verifyToken } from "../middleware/auth_Middleware.js"
import { validateAdminProfileForm } from "../middleware/admin_middleware.js";

const router = express.Router()

router.get("/api/adminProfile/details" , verifyToken , getAdminProfile);
router.put("/api/update/adminProfile/details" ,verifyToken , validateAdminProfileForm , updateAdminProfile)

export default router