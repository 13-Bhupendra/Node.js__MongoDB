import express from "express";
import dataRoute from "./routes/route.js"
import { connectDB } from "./config/db.js"; 

const PORT = 7000;
const app = express()
connectDB()

app.use(express.json())

app.use("/" , dataRoute);

app.listen(PORT , ()=>{
    console.log("Server Started on PORT http://localhost:" + PORT)
})
