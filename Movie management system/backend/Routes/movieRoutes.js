import express from  "express"
import { AddMovie, fetchData, getSingleMovieData, removeData, updateData } from "../controllers/movieControllers.js"
import upload from "../middleware/fileUpload.js";

const router =  express.Router();

router.post("/post" , upload.single("image") , AddMovie);
router.get("/get" , fetchData);
router.delete("/delete/:movieTitle" , removeData)
router.put("/update/:id" ,upload.single("image") , updateData);
router.get("/movie/:id" , getSingleMovieData);
export default router;