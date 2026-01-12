import mongoose  from "mongoose";

const investigatorProfileSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authCollection",
    required: true
    } ,
    investigatorId : String ,
    name : String ,
    email : String ,
    phone : String ,
    address : String,   
    city : String, 
    state : String,
    department : String,
    designation : String ,
    isAvailable : Boolean,
    joiningDate : Date
    
} , {timestamps : true})

export const investigatorProfile_Collection = mongoose.model("investigatorProfileCollection" , investigatorProfileSchema);