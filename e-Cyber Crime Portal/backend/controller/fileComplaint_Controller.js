import { Complaint_Collection } from "../model/complaint_model.js";

/*============== add New Complaint ===============*/
export const addNewComplaint = async (req , res)=>{
    const id = req.user._id;
    try {
        const result = await Complaint_Collection.create({
            userId : id,
            ...req.body,
            fileName : req.file.filename ,
            filePath : `/uploads/${req.file.filename}`
        });
        
        return res.status(200).json({status : true , message : "Complaint Filed Successfully !" , result});
    } catch (error) {
         res.status(200).json({status : false , message : "Complaint not Filed  !" , error : error.message});
    }
}


