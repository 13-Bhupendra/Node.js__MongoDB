import { investigatorProfile_Collection } from "../model/investigatorProfile_model.js";

/*=========== get investigator profile ===========*/
export const getInvestigatorProfile = async (req ,res)=>{

}

/*=========== update investigator profile ==============*/
export const updateInvestigatorProfile = async (req ,res )=>{
    try {
        const email = req.user.email
        const {investigatorId , personalPhone , officialPhone , officeEmail , pincode , address , city , state , department , designation , joiningDate} = req.body

        const investigator = await investigatorProfile_Collection.findOneAndUpdate({email} ,
            {$set : {investigatorId , personalPhone , officeEmail , officialPhone , pincode , address , city , state , department , designation , joiningDate}},
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