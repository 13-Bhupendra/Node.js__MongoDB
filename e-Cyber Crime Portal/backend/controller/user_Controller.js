import { Auth_Collection } from "../model/auth_model.js";
import { UserProfile_Collection } from "../model/userProfile_model.js";


/*=============Update User Profile Controller =============*/
export const updateUserProfile = async (req ,res)=>{
    try {
        const {email , name  , phone , pincode , address , city , state} = req.body;
        const user = await UserProfile_Collection.findOne({email})
        if(!user){
            return res.status(400).json({status : false , message : "User not found , register first !"});
        }

        const result =  await UserProfile_Collection.updateOne({email} , {$set : {
            name , phone , pincode , address , city , state 
        }})

        await Auth_Collection.updateOne({email} , {$set : {
            name
        }})

        res.status(200).json({status : true , message : "User Profile updated successfull !" ,  result});

    } catch (error) {
        res.status(500).json({status : false , message : "User Profile not updated !" ,  result});
    }
}
