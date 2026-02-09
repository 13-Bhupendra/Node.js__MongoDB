import { Complaint_Collection } from "../model/complaint_model.js";


/*================ fetched all the comlaints ================*/
export const getComplaintsData = async(req ,res)=>{
    try {
        const complaints = await Complaint_Collection.find().populate("userId" , "email name").populate("assignedInvestigator" , "email name");

       if (complaints.length === 0) {
            return res.status(200).json({
                status: false,
                message: "No complaints filed yet"
            });
        }

        res.status(200).json({status : true , message : "All complaints Fetched successfully" , complaints});

    } catch (error) {
        res.status(500).json({status : false , message : "All complaints Fetched failed" , error});
    }
}


/*=============== Get All Complaints as per user controller ===========*/
export const getAllComplaintsOfUser = async (req , res)=>{
    const id = req.user._id;
    try {
        const complaints = await Complaint_Collection.find({userId : id});
       if (complaints.length === 0) {
            return res.status(200).json({
                status: false,
                message: "No complaints filed yet"
            });
        }

        res.status(200).json({status : true , message : "All complaints Fetched successfully" , complaints});

    } catch (error) {
        res.status(500).json({status : false , message : "All complaints Fetched failed" , error});
    }
}


/*================get single Complaint data controller =============*/
export const getSingleComplaint = async (req ,res)=>{
    const id = req.query.id;

    try {
        const complaint = await Complaint_Collection.findById(id)
        .populate("assignedInvestigator" , "email name");
        
        res.status(200).json({status : true , message : "View Single Complaint !" , complaint});
    } catch (error) {
        res.status(500).json({status : false , message : "Single complaint get failed !" , error});
    }
}


/*============== add New Complaint ===============*/
export const addNewComplaint = async (req , res)=>{
    const id = req.user._id;
    try {
            if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Evidence file is required",
            });
            }

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



/*=============== Assign Complaint to Investigator Controller =============*/
export const assignComplaintToInvestigator = async (req , res ) =>{
    const {id , investigatorId} = req.body
    try {

        if(!investigatorId){
            return res.status(401).json({status : false , message : "* Select Valid Investigator To Proceed"})
        }

        const updatedComplaint = await Complaint_Collection.findByIdAndUpdate(id , 
            {
                assignedInvestigator : investigatorId,
                status : "assigned"
            }
        )
        
         res.status(200).json({status : true , message : "Investigator Assigned Successfull !" , updatedComplaint})
    } catch (error) {
         res.status(500).json({status : false , message : "Investigator not Assigned !"})
    }
}



/*======================= get assigned complaint for investigator ===============*/
export const getAssignedComplaintsForInvestigator = async (req, res) => {
  try {
    const investigatorId = req.user._id; 

    const complaints = await Complaint_Collection.find({
      assignedInvestigator: investigatorId,
    })
      .populate("userId", "name email")
      .populate("assignedInvestigator", "email");

    res.status(200).json({
      status: true,
      message: "Assigned complaints fetched successfully",
      complaints,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
