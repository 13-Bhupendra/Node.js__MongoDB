import express from "express"
import MovieRoutes from "./Routes/movieRoutes.js"
import {connectDB} from "./config/db.js"
// import cors from "cors"

const app = express()
const PORT = 7000;
connectDB();

// app.use(cors())
app.use(express.json())

app.use("/api" , MovieRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/" ,(req , res)=>{
    res.status(404).json({message: "Page not found",error: "The requested endpoint does not exist"})
})

app.listen(PORT , ()=>{
    console.log("Server started successfully on PORT http://localhost:" + PORT);
})