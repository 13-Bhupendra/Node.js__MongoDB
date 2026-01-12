import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String ,unique : true , required : true},
    password : {type : String , required : true},
    role : {type : String , required : true} 
} , {timestamps : true})

export const Auth_Collection = mongoose.model("authCollection" , authSchema )