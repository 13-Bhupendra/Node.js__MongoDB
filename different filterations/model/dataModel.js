import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        productName : {type : String , required : true}, 
        category : {type : String , required : true}, 
        brand : {type : String , required : true}, 
        price : {type : Number , required : true}, 
        rating : {type : Number }, 
        description : {type : String , required : true}
    } ,
    {
        timestamps: true
    }
)

export const Data = mongoose.model("ProductData" , dataSchema)