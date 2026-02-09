import express from "express";
import upload from "../middleware/evidenceFileUpload_middleware.js";
import {
  addNewComplaint,
  assignComplaintToInvestigator,
  getAllComplaintsOfUser,
  getComplaintsData,
  getSingleComplaint,
  getAssignedComplaintsForInvestigator
} from "../controller/fileComplaint_Controller.js";
import { verifyToken } from "../middleware/auth_Middleware.js";
import { validateComplaintForm } from "../middleware/complaint_middleware.js";

const router = express.Router();

router.get("/api/all-Complaints", getComplaintsData);
router.get("/api/my-complaints", verifyToken, getAllComplaintsOfUser);
router.get("/api/view/complaint", getSingleComplaint);
router.post("/api/add-Complaint",verifyToken,upload.single("image"),validateComplaintForm,addNewComplaint);
router.put("/api/assign/Complaint", assignComplaintToInvestigator);
router.get("/api/investigator/assigned-complaints",verifyToken,getAssignedComplaintsForInvestigator);

export default router;
