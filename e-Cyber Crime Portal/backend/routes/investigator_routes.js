import express from "express"
import { verifyToken } from "../middleware/auth_Middleware.js"
import { getInvestigatorProfile, updateInvestigatorProfile } from "../controller/investigator_Controller.js"
import { validateInvestigatorProfileForm } from "../middleware/investigator_middleware.js";

const router = express.Router()

router.get("/api/investigatorProfile/details", verifyToken , getInvestigatorProfile);
router.put("/api/update/investigatorProfile/details" , verifyToken , validateInvestigatorProfileForm , updateInvestigatorProfile);

export default router;