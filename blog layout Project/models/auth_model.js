import mongoose from "mongoose";

const user = new mongoose.Schema({
    username : {type : String , require : true},
    email : {type : String, require : true},
    password : {type : String, require : true}
}, { timestamps: true});

export const AuthModel = mongoose.model("auth" , user);
