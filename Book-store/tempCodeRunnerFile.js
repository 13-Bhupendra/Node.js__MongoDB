import express from "express";
import book_router from "./routes/bookRoutes.js"
import { connectDB } from "./config/db.js";

const PORT = 7000;
const app = express()
connectDB()

app.use(express.json());

app.use("/api" , book_router);

app.use("/", (req ,res)=>{
    res.status(404).json({message: "Page not found",error: "The requested endpoint does not exist"});
})

app.listen(PORT , ()=>{
    console.log("Server started successfully on PORT http://localhost:" + PORT);
})