import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authCollection",
    required: true
    },
    name : String ,
    email : String ,
    phone : String ,
    address : String,
    city : String, 
    state : String,
} , {timestamps : true})

export const UserProfile_Collection = mongoose.model("userProfileCollection" , userProfileSchema);