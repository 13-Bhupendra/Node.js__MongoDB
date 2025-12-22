import mongoose from "mongoose";

export const connectDB = async ()=> {
    try {
        await mongoose.connect("mongodb://localhost:27017/ProductData");
        console.log("Server connect successfull !");    
    } catch (error) {
        console.log("Server Did`nt connected ! " , error.message )
    }
}