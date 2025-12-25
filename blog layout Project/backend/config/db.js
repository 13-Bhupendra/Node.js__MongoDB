import mongoose from "mongoose"

export const connectDB = async ()=> {
    try {
        await mongoose.connect("mongodb://localhost:27017/auth");
        console.log("mongoDb connected Successfully !");
    } catch (error) {
        console.log("Server connection failed !");
    }
}