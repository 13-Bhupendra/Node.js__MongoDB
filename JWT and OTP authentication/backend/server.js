import express from "express"
import { connectDB } from "./config/db.js"
import Routers from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB()

app.use("/" , Routers);

app.listen(process.env.PORT , ()=>{
    console.log("Server started successfull on the PORT http://localhost:7000");
})