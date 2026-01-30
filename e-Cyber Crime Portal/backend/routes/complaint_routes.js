import express from "express"
import upload from "../middleware/evidenceFileUpload_middleware.js";
import { addNewComplaint, getAllComplaints, getSingleComplaint } from "../controller/fileComplaint_Controller.js";
import { verifyToken } from "../middleware/auth_Middleware.js";
import { validateComplaintForm } from "../middleware/complaint_middleware.js";

const router = express.Router();

router.get("/api/my-complaints" , verifyToken , getAllComplaints)   
router.get("/api/view/complaint" , getSingleComplaint);
router.post("/api/add-Complaint" , verifyToken ,  upload.single("image") ,validateComplaintForm, addNewComplaint);

export default router