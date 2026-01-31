import mongoose from "mongoose"

const ComplaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "authCollection" },
  complaintId: {type:String , unique : true , default : ()=> "URID-" + Date.now()},
  fullName: {type:String , required : true},
  fatherOrMotherName: {type:String , required : true},
  gender: {type:String , required : true},
  title: {type:String , required : true},
  description: {type:String , required : true},
  crimeType: {type:String , required : true},
  incidentDate: {type:String , required : true},
  incidentTime: {type:String , required : true},
  websiteOrAppName: {type:String , required : true},
  amountLost: {type:Number , required : true},
  fileName: { type: String }, 
  filePath: { type: String },
  status: {type:String , default : "pending" , required : true},
  assignedInvestigator: {type: mongoose.Schema.Types.ObjectId,ref: "authCollection",default: null},
  investigatorNote: {type : String , default : null} 

}, { timestamps: true })

export const Complaint_Collection = mongoose.model("Complaint", ComplaintSchema)
