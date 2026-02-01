import { adminProfile_Collection } from "../model/adminProfile_model.js";

/*============= get fetche admin =========*/
export const getAdminProfile = async (req , res)=>{
    try {
        const email = req.user.email;
        const admin = await adminProfile_Collection.findOne({email})
        
        if(!admin){
            return res.status(401).json({status : false , message : "Admin not found ! "});
        }

        res.status(200).json({status : true , message : "Admin profile fetched successfully . " , admin})

    } catch (error) {
        res.status(500).json({status : false , message : "Admin profile fetched falied . " , error : error.message})
    }
}


/*=============== update admin profile ==============*/
export const updateAdminProfile = async (req ,res)=>{
    try {
        const email = req.user.email;
        const {phone , designation , city , state} = req.body;

        const admin = await adminProfile_Collection.findOneAndUpdate({email} , 
        {$set : {phone , designation , city , state}} ,
        {new : true}
        )

        if(!admin){
            return res.status(401).json({status : false , message : "Admin not found ! "});
        }

        res.status(200).json({status : true , message : "Profile Updated Successfully !" , admin})
    } catch (error) {
        res.status(500).json({status : false , message : "Profile Updated failed !" , error : error.message});
    }
}


