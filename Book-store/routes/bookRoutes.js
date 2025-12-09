/// routes / bookRoutes

import express from "express";
import {getBooksData , addBook, removeBook, updateData} from "../controllers/bookController.js";

const router = express.Router();

router.get("/get" , getBooksData);
router.post("/post" , addBook);
router.put("/update/:bookName" , updateData)
router.delete("/delete/:bookName" , removeBook)

export default router;