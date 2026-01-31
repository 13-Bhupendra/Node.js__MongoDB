import { investigatorProfile_Collection } from "../model/investigatorProfile_model.js";
import {Auth_Collection} from "../model/auth_model.js"

// ============== Get all investigator data controller =============*/
export const getAllInvestigatorsData = async (req, res)=>{
    try {
        const investigators = await Auth_Collection.find({role : "investigator"});

         res.status(200).json({status : true , message : "Investigators fetched successfully !" , investigators});
    } catch (error) {
         res.status(500).json({status : false , message : "Investigators fetched failed !" , error});
    }
}



/*=========== get investigator profile ===========*/
export const getInvestigatorProfile = async (req ,res)=>{
    try {
        const email = req.user.email 

        const investigator = await investigatorProfile_Collection.findOne({email})

         if(!investigator){
            return res.status(401).json({status : false , message : "investigator not found ! "});
        }

        res.status(200).json({status : true , message : "Investigator profile fetched successfuly  !" , investigator})

    } catch (error) {
        res.status(500).json({status : false , message : "Investigator profile fetched falied  !" , error })
    }
}

/*=========== update investigator profile ==============*/
export const updateInvestigatorProfile = async (req ,res )=>{
    try {
        const email = req.user.email
        const {personalPhone , officialPhone , officeEmail , pincode , address , city , state , department , designation , joiningDate} = req.body

        const investigator = await investigatorProfile_Collection.findOneAndUpdate({email} ,
            {$set : { personalPhone , officeEmail , officialPhone , pincode , address , city , state , department , designation , joiningDate}},
            {new : true}
        )

        if(!investigator){
            return res.status(401).json({status : false , message : "investigator not found ! "});
        }

        res.status(200).json({status : true , message : "Profile Updated Successfully !" , investigator})

    } catch (error) {
        res.status(500).json({status : false , message : "Profile Updated failed !" , error : error.message});
    }
}