import express from "express";
import { getUsers, homePage, signIn, signInPage, signUp, signUpPage } from "../controller/auth_controller.js";
import { checkAuthReq, checkUserLoggedIn, redirectIfLoggedIn } from "../middleware/auth_middleware.js";

const router = express.Router()

router.post("/api/signup" , checkAuthReq , redirectIfLoggedIn , signUp);
router.post("/api/signin" , signIn);
router.get("/api/get" , checkUserLoggedIn , getUsers);

router.get("/" , checkUserLoggedIn , homePage)
router.get("/signin" ,redirectIfLoggedIn , signInPage)
router.get("/signup" , redirectIfLoggedIn , signUpPage);


export default router;