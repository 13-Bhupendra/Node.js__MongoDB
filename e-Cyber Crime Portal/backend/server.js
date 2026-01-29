import express from "express"
import Auth_Routers from "./routes/auth_routes.js"
import User_Routers from './routes/user_routes.js'
import Admin_Routers from "./routes/admin_routes.js"
import Investigator_Routers from "./routes/investigator_routes.js"
import Complaint_Routers from "./routes/complaint_routes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


connectDB()

app.use("/" , Auth_Routers);
app.use("/" , User_Routers);
app.use("/" , Admin_Routers);
app.use("/" , Investigator_Routers)
app.use("/" , Complaint_Routers)
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT , ()=>{
    console.log("Server started successfully , on the PORT http://localhost:"+process.env.PORT)
})
