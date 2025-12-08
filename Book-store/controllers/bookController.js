import {Book} from "../models/book_Model.js";

//get books data
export const getBooksData = async (req , res)=> {
    try {
        const result = await Book.find()
        res.status(200).json({ Books_Data : result})
    } catch (error) {
        res.status(400).json({message : "data not found !" , error : error.message})
    }
}


// add book controller
export const addBook = async (req ,res)=>{
        try {
            const result = await Book.insertOne(req.body);
            res.status(201).json({message : "data inserted !" , result})
        } catch (error) {
            res.status(400).json({message : "data not inserted !" , error : error.message})
        }
}


// update book data 
export const updateData = async (req , res)=> {
    const {bookName}  = req.params
    const data = req.body

    try {
        const result = await Book.updateOne({bookName : bookName} , {$set : data})
        res.status(200).json({message : "data  updated Successfull  !" , result})
        
    } catch (error) {
        res.status(400).json({message : "data not updated !" , error : error.message})
    }
}


//delete book controller 
export const removeBook = async (req , res)=>{
    const {bookName} = req.params

    try {
        const result = await Book.deleteOne({bookName : bookName})
        res.status(200).json({message : "data  removed !" , result})

    } catch (error) {
        res.status(400).json({message : "data not Deleted !" , error : error.message})
    }
}