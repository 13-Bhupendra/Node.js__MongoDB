import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async ()=>{
    try {
       await mongoose.connect(process.env.MONGODB_ATLAS_URL)
       console.log("MongoDB connection successfull !")
    } catch (error) {
        console.log("mongoDB server connection failed !")
    }
}