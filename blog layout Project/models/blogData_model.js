import mongoose from "mongoose";

const blog = new mongoose.Schema ({
    username : {type : String , require : true},
    title : {type :String , require:true},
    content :  {type :String , require:true},
    
    date: {
        type: String,
        default: () => new Date().toLocaleDateString()
    },

    time: {
        type: String,
        default: () => new Date().toLocaleTimeString()
    },
    
    fileName: { type: String }, 
    filePath: { type: String }
} , {
     timestamps: true
})

export const BlogModel = mongoose.model("blog" , blog);