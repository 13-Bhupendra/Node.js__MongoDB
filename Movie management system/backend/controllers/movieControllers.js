import { Movies } from "../models/movieModel.js";

//get data
export const fetchData = async (req , res)=>{
    try {
        const result = await Movies.find()
        res.status(200).json({"MoviesData" : result})
    } catch (error) {
          res.status(500).json({message : "Data not fetched !" , error : error.message})
    }
}

// SEARCH MOVIES
// export const searchMovie = async (req, res) => {
//   try {
//     const { movieTitle } = req.query;

//     if (!movieTitle || movieTitle.trim() === "") {
//       return res.status(200).json([]);
//     }

//     const result = await Movies.find({
//       movieTitle: { $regex: movieTitle, $options: "i" },
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Search failed" });
//   }
// };


//get single movie data 
export const getSingleMovieData = async (req , res)=> {
    try {
        const {id} = req.params
        const result = await Movies.findById(id);
        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(result);
    } catch (error) {
          res.status(500).json({message : "Data not fetched !" , error : error.message})
    }
}


// add movie data 
export const AddMovie = async (req ,res)=>{
    try {
        const result = await Movies.insertOne({
            ...req.body,
            fileName : req.file.filename,
            filePath: `/uploads/${req.file.filename}`
        })
        res.status(200).json({message : "Data Added Successfully !" , result})
    } catch (error) {
        res.status(500).json({message : "Data not added !" , error : error.message})
    }
}

//update Movie Data
export const updateData = async (req , res)=>{
    const {id} = req.params
    const updatedData = {...req.body};

    if (req.file) {
    updatedData.fileName = req.file.filename;
    // updatedData.filePath = req.file.path;
     updatedData.filePath = `/uploads/${req.file.filename}`;
    }

    try {
        const result = await Movies.findByIdAndUpdate(id , updatedData , {new : true })
        res.status(200).json({message : "Data Updated !" , result})
    } catch (error) {
        res.status(500).json({message : "Data not Updated !" , error : error.message})
    }
}

//delete Movie data 
export const removeData = async(req ,res)=> {
    const {movieTitle} = req.params
    try {
        const result = await Movies.deleteOne({movieTitle : movieTitle})
        res.status(200).json({message : "Data Deleted !" , result})
    } catch (error) {
        res.status(500).json({message : "Data not Deleted !" , error : error.message})
    }
}