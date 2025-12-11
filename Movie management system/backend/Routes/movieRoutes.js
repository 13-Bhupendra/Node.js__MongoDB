import express from  "express"
import { AddMovie } from "../controllers/movieControllers.js"
import upload from "../middleware/fileUpload.js";

const router =  express.Router();

router.post("/post" , upload.single("image") , AddMovie);

export default router;