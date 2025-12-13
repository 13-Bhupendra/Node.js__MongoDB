import express from  "express"
import { AddMovie, fetchData, removeData, updateData } from "../controllers/movieControllers.js"
import upload from "../middleware/fileUpload.js";

const router =  express.Router();

router.post("/post" , upload.single("image") , AddMovie);
router.get("/get" , fetchData);
router.delete("/delete/:movieTitle" , removeData)
router.put("/update/:movieTitle" ,upload.single("image") , updateData);

export default router;