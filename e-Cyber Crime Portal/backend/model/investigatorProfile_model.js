import mongoose  from "mongoose";

const investigatorProfileSchema = new mongoose.Schema({
    investigatorId : String ,
    name : String ,
    email : String ,
    role : String,
    personalPhone : String ,
    officialPhone : String,
    officeEmail:String,
    pincode : Number,
    address : String,   
    city : String, 
    state : String,
    department : String,
    designation : String ,
    isAvailable : {type : Boolean , default : true},
    joiningDate : Date
} , {timestamps : true})

export const investigatorProfile_Collection = mongoose.model("investigatorProfileCollection" , investigatorProfileSchema);