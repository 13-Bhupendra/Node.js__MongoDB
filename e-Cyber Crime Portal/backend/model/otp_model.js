import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const otpSchema = new mongoose.Schema({
    email : {type : String , required : true} ,
    otp : {type : String , required : true} ,
    expireAt : Date 
} , {timestamps:true});

export const OTP_Collection = mongoose.model("otpCollection" , otpSchema);