import { investigatorProfile_Collection } from "../model/investigatorProfile_model.js";
import {Auth_Collection} from "../model/auth_model.js"
import {Complaint_Collection} from "../model/complaint_model.js" 

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


// ============== Admin edit investigator (name + email) =============*/
export const adminEditInvestigator = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!id) {
            return res.status(400).json({ status: false, message: "Investigator id is required" });
        }

        const authDoc = await Auth_Collection.findById(id);
        if (!authDoc) {
            return res.status(404).json({ status: false, message: "Investigator not found" });
        }

        const oldEmail = authDoc.email;

        // if email is changing, ensure uniqueness (exclude current investigator)
        if (email && email !== oldEmail) {
            const existing = await Auth_Collection.findOne({ email });
            if (existing && existing._id.toString() !== id) {
                return res.status(400).json({ status: false, errors: { email: "Email already exists" } });
            }
        }

        // update Auth collection
        const updatedAuth = await Auth_Collection.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );

        // update investigator profile collection (find by old email)
        const updatedProfile = await investigatorProfile_Collection.findOneAndUpdate(
            { email: oldEmail },
            { $set: { name, email } },
            { new: true }
        );

        res.status(200).json({ status: true, message: "Investigator updated successfully", updatedAuth, updatedProfile });

    } catch (error) {
        res.status(500).json({ status: false, message: "Update failed", error: error.message });
    }
}


// ============== Admin delete investigator =============*/
export const adminDeleteInvestigator = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: false, message: "Investigator id is required" });
        }

        const authDoc = await Auth_Collection.findById(id);
        if (!authDoc) {
            return res.status(404).json({ status: false, message: "Investigator not found" });
        }

        const email = authDoc.email;

        await Auth_Collection.findByIdAndDelete(id);

        await investigatorProfile_Collection.findOneAndDelete({ email });

        return res.status(200).json({ status: true, message: "Investigator deleted successfully" });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Deletion failed", error: error.message });
    }
}


/*=================== investigator update complaint =======================*/
export const investigatorUpdateComplaint = async (req, res) => {
  try {
    const { id, status, investigatorNote } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        status: false,
        message: "id and status required"
      });
    }

    const complaint = await Complaint_Collection.findById(id);

    if (!complaint) {
      return res.status(404).json({
        status: false,
        message: "Complaint not found"
      });
    }

    complaint.status = status;
    complaint.investigatorNote = investigatorNote || null;

    await complaint.save();

    return res.status(200).json({
      status: true,
      message: "Complaint updated successfully",
      complaint
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};



/*================ get all resolved complaint by investigator ========================*/