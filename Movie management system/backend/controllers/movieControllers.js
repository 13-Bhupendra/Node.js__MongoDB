import { Movies } from "../models/movieModel.js";

// add movie data 
export const AddMovie = async (req ,res)=>{
    try {
        const result = await Movies.insertOne({
            fileName : req.file.filename,
            filePath : req.file.path
        })
        res.status(200).json({message : "File Uploaded !" , result})
    } catch (error) {
        res.status(500).json({message : "file not uploaded !"})
    }
}