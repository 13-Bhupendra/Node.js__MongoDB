import express from "express"
import { connectDB } from "./config/db.js"
import router from "./routes/OTP_route.js"
import dotenv from "dotenv"

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use("/" , router)

app.listen(process.env.PORT , ()=>{
    console.log("Server started Sucessfully on PORT http://localhost:" + process.env.PORT);
});