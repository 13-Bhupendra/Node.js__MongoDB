import express from "express"
import { getAdminProfile, updateAdminProfile } from "../controller/admin_Controller.js"
import { verifyToken } from "../middleware/auth_Middleware.js"
import { validateAdminProfileForm, verifyAdmin } from "../middleware/admin_middleware.js";
import { validateEditInvestigator } from "../middleware/investigator_middleware.js";
import { adminEditInvestigator, adminDeleteInvestigator } from "../controller/investigator_Controller.js";
import { adminEditUser, adminDeleteUser } from "../controller/user_Controller.js";
import { validateEditUser } from "../middleware/user_middleware.js";

const router = express.Router()

router.get("/api/adminProfile/details", verifyToken, getAdminProfile);
router.put("/api/update/adminProfile/details", verifyToken, validateAdminProfileForm, updateAdminProfile);

router.put("/api/admin/investigator/:id", verifyToken, validateEditInvestigator, adminEditInvestigator);
router.delete("/api/admin/investigator/:id", verifyToken, verifyAdmin, adminDeleteInvestigator);

router.put("/api/admin/user/:id", verifyToken, validateEditUser, adminEditUser);
router.delete("/api/admin/user/:id", verifyToken, verifyAdmin, adminDeleteUser);

export default router;
