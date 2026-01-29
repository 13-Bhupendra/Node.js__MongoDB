import express from "express"
import upload from "../middleware/evidenceFileUpload_middleware.js";
import { addNewComplaint } from "../controller/fileComplaint_Controller.js";
import { verifyToken } from "../middleware/auth_Middleware.js";

const router = express.Router();

router.post("/api/add-Complaint" , verifyToken ,  upload.single("image") , addNewComplaint);

export default router