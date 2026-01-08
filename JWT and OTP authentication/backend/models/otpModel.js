import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp : String , 
    email : String , 
    expireAt : Date
} , {timestamps : true});

export const otpCollection = mongoose.model("otp" , otpSchema);