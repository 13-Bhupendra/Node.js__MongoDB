import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookName : {type : String , required : true},
    author : {type : String , required : true},
    description : {type : String , required : true},
    price : {type : Number , required : true},
    category : {type : String , required : true},
    publishedYr : {type : Number , required : true},
})

export const Book  = mongoose.model("book" , bookSchema)