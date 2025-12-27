import express from "express";
import auth_routers from "./routes/auth_routes.js"
import { connectDB } from "./config/db.js";
import cookieParser from 'cookie-parser'
import {fileURLToPath } from 'url'
import path from "path"

const app = express()
app.use(express.json());
app.use(cookieParser());

const PORT = 7000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const indexFilePath = path.join(__dirname , "static" , "index.html")
export const signinFilePath = path.join(__dirname , "static" , "signin.html")
export const signupFilePath = path.join(__dirname , "static" , "signup.html")

connectDB()
app.use("/" , auth_routers);

app.listen(PORT, ()=> {
    console.log("Server Started Successfully , on the PORT http://localhost:"+PORT);
});

