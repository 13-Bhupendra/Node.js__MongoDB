import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";


export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connnection successfull");
    } catch (error) {
        console.log("MongoDB server connection failed !");
    }
}