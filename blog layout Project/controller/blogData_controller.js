import { BlogModel } from "../models/blogData_model.js";


// add blog
export const addBlog = async (req ,res)=>{
    
    try {
            const {title , content} = req.body;
            const username = req.cookies.username;

            const blog = new BlogModel({
                title ,
                content , 
                username,
                fileName : req.file.filename ,
                filePath : `/uploads/${req.file.filename}`
            })

            const result = await blog.save()
            res.status(200).json({message : "Blog data Added successfully !", result} );
    } catch (error) {
            res.status(400).json({message : "Blog data Not added !", error} );
    }
}

//get blog
export const getBlog = async (req ,res)=>{
    try {
        const username = req.cookies.username;

        const result = await BlogModel.find({username})
        res.status(200).json({message : "Blog fetched !", result} );
    } catch (error) {
        res.status(401).json({message : "Blog not fetched !", error} );
    }
}

// delete blog 
export const removeBlog = async (req , res)=>{
    const {id} = req.params
    try {
        const result = await BlogModel.findByIdAndDelete(id)    
        res.status(200).json({message : "Blog deleted !", result} );
    } catch (error) {
        res.status(401).json({message : "Blog not deleted !", error} );
    }
}