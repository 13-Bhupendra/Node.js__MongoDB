import express from "express"
import { verifyToken } from "../middleware/auth_Middleware.js"
import { getAllInvestigatorsData, getInvestigatorProfile, investigatorUpdateComplaint, updateInvestigatorProfile } from "../controller/investigator_Controller.js"
import { validateInvestigatorProfileForm } from "../middleware/investigator_middleware.js";

const router = express.Router()

router.get("/api/getAll/Investigators" , getAllInvestigatorsData);
router.get("/api/investigatorProfile/details", verifyToken , getInvestigatorProfile);
router.put("/api/update/investigatorProfile/details" , verifyToken , validateInvestigatorProfileForm , updateInvestigatorProfile);

router.put(
  "/api/investigator/update-complaint",
  verifyToken,
  investigatorUpdateComplaint
);

export default router;