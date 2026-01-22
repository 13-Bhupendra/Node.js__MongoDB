import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    name : String ,
    role : String,
    email : String ,
    phone : String ,   
    pincode : Number, 
    address : String,
    city : String, 
    state : String,
} , {timestamps : true})

export const UserProfile_Collection = mongoose.model("userProfileCollection" , userProfileSchema);