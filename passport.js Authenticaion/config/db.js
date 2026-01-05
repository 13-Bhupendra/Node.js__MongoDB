import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/passportDB")
        console.log("Server Connected Successfully !");
    } catch (error) {
        console.log("Server connection failed !")
    }    
}