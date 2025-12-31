import express from "express"
import passport from "passport"
import { isAuthenticated } from "../middleware/authMiddleware.js"
import {  dashboard, signin, signup } from "../controller/authController.js"

const router = express.Router()

router.post("/signup" , signup)
router.post("signin" , passport.authenticate("local") , signin)

router.get("/home" , isAuthenticated , dashboard );

export default router;
