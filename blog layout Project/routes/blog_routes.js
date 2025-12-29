import express from "express"
import { addBlog, getBlog, removeBlog } from "../controller/blogData_controller.js"
import upload from "../middleware/fileUploading_middleware.js"

const router = express.Router()

router.post("/api/blog" , upload.single("image") , addBlog);
router.get("/api/blog/get" , getBlog);
router.delete("/api/delete/:id" , removeBlog);

export default router