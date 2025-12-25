import mongoose from "mongoose";

const user = new mongoose.Schema({
    email : {type : String, require : true},
    password : {type : String, require : true}
}, {Timestamp : true});

export const AuthModel = mongoose.model("auth" , user);
