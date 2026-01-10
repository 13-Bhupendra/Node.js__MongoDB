import express from "express"
import Auth_Routers from "./routes/auth_routes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true}));

connectDB()

app.use("/" , Auth_Routers);

app.listen(process.env.PORT , ()=>{
    console.log("Server started successfully , on the PORT http://localhost:"+process.env.PORT)
})
