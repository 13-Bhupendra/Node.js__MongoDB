import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { FaFileUpload, FaUser, FaUserFriends, FaVenusMars, FaHeading, FaAlignLeft, FaExclamationTriangle, FaCalendarAlt, FaClock, FaGlobe, FaDollarSign } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import "../../style/fileComplaint.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const crimeOptions = [
  "Fraud", "Hacking", "Phishing", "Cyber Bullying", "Identity Theft",
  "Online Scam", "Ransomware", "Data Breach", "Harassment", "Other"
];

const websiteOptions = [
  "Facebook", "Instagram", "WhatsApp" , "Twitter",  "LinkedIn" , "Other"
];

const FileComplaint = () => {

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL


  const [fullName , setFullName] = useState("");
  const [fatherOrMotherName , setFatherOrMotherName] = useState("");
  const [gender , setGender] = useState("");
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [crimeType , setCrimeType] = useState("");
  const [incidentDate , setIncidentDate] = useState("");
  const [incidentTime , setIncidentTime] = useState("")
  const [websiteOrAppName , setWebsiteOrAppName] = useState("");
  const [amountLost , setAmountLost] = useState("");
  const [image , setImage] = useState(null);

  const [error , setError] = useState({})

  /*handle add and filed complaints */
  const handleFiledComplaint = async ()=>{

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("fatherOrMotherName", fatherOrMotherName);
    formData.append("gender", gender);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("crimeType", crimeType);
    formData.append("incidentDate", incidentDate);
    formData.append("incidentTime", incidentTime);
    formData.append("websiteOrAppName", websiteOrAppName);
    formData.append("amountLost", amountLost);
    formData.append("image", image);

    try {
        setError({});

        const res = await axios.post(`${BASE_URL}/api/add-Complaint` , formData , {withCredentials : true});
        if(res.data.status){
          alert("Complaint Filed Successfull !")
          setFullName(""),setFatherOrMotherName(""),setGender(""),setTitle(""),setDescription("")
          ,setCrimeType(""),setIncidentDate(""),setIncidentTime(""),setWebsiteOrAppName(""),setImage(null).amountLost(null)
        }
    } catch (error) {
      if(error.response?.data?.errors){
          setError(error.response.data.errors)
      }
    }
  }

  return (
    <div className="mainSection">
      <Navbar PageName="File Complaint" />
    
      <div className="d-flex justify-content-center mt-5 mb-5 ">
        <div className="profileMainContentCard" style={{ width: "80%" }}>

          {/* Personal Info */}
          <div className="profileDetailsCard">
            <div className="personalHeader">
              <h5>Personal Details</h5>
              <p>Fill your personal information</p>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaUser /></div>
              <div className="formContent">
                <label>Full Name</label>
                <input value={fullName} type="text" placeholder="Enter your full name" onChange={(e)=> setFullName(e.target.value)} />
                {error.fullName && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.fullName}</p>}
              </div>

              <div className="formIcon"><FaUserFriends /></div>
              <div className="formContent">
                <label>Father / Mother Name</label>
                <input value={fatherOrMotherName} type="text" placeholder="Parent's name"  onChange={(e)=> setFatherOrMotherName(e.target.value)} />
                {error.fatherOrMotherName && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.fatherOrMotherName}</p>}
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaVenusMars /></div>
              <div className="formContent">
                <label>Gender</label>
                <select value={gender}  onChange={(e)=> setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {error.gender && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.gender}</p>}
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="profileDetailsCard mt-4">
            <div className="personalHeader">
              <h5>Incident Details</h5>
              <p>Provide details of the incident</p>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaHeading /></div>
              <div className="formContent">
                <label>Title</label>
                <input value={title} type="text" placeholder="Complaint title"  onChange={(e)=> setTitle(e.target.value)} />
                {error.title && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.title}</p>}
              </div>

              <div className="formIcon"><FaAlignLeft /></div>
              <div className="formContent">
                <label>Description</label>
                <textarea value={description} placeholder="Describe the incident" rows="1"  onChange={(e)=> setDescription(e.target.value)} />
                {error.description && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.description}</p>}
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaExclamationTriangle /></div>
              <div className="formContent">
                <label>Crime Type</label>
                <select value={crimeType}  onChange={(e)=> setCrimeType(e.target.value)}>
                  <option value="">Select Crime Type</option>
                  {crimeOptions.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
                {error.crimeType && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.crimeType}</p>}
              </div>

              <div className="formIcon"><FaGlobe /></div>
              <div className="formContent">
                <label>Website / App Name</label>
                <select value={websiteOrAppName}  onChange={(e)=> setWebsiteOrAppName(e.target.value)}>
                  <option value="">Select Website / App</option>
                  {websiteOptions.map((w, i) => <option key={i} value={w}>{w}</option>)}
                </select>
                {error.websiteOrAppName && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.websiteOrAppName}</p>}
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaCalendarAlt /></div>
              <div className="formContent">
                <label>Incident Date</label>
                <input type="text" placeholder="Enter Incident Data e.g. 01/01/2026"  value={incidentDate}  onChange={(e)=> setIncidentDate(e.target.value)}/>
                {error.incidentDate && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>
                   * Enter valid date in DD/MM/YYYY format.<br />
                   (year ≥ 2000, future dates not allowed)</p>}
              </div>

              <div className="formIcon"><FaClock /></div>
              <div className="formContent">
                <label>Incident Time</label>
                <input type="time" value={incidentTime}  onChange={(e)=> setIncidentTime(e.target.value)} />
                {error.incidentTime && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.incidentTime}</p>}
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaDollarSign /></div>
              <div className="formContent">
                <label>Amount Lost</label>
                <input value={amountLost} type="string"   placeholder="Enter amount lost"  onChange={(e)=> setAmountLost(Number(e.target.value))} />
                {error.amountLost && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.amountLost}</p>}
              </div>
            </div>
          </div>

          {/* Evidence Upload */}
          <div className="profileDetailsCard mt-4">
            <div className="personalHeader">
              <h5>Evidence Upload</h5>
              <p>Attach files related to the complaint</p>
            </div>

            <div className="evidenceUploadBox d-flex flex-column align-items-center justify-content-center">
              {image ? <IoCheckmarkDoneCircle  size={40} color="#5dade2" /> : <FaFileUpload size={40} color="#5dade2" />}
              <p>{image ? "Evidence File Uploaded" : "Click to upload files"}</p>
              <p>{image ? null  : "JPG, PNG, PDF up to 10MB"}</p>
              <input type="file" className="evidenceInput"  onChange={(e)=> setImage(e.target.files[0])} />
              {error.image && <p className="mt-1" style={{color : "red" , fontSize:"12px"}}>{error.image}</p>}
            </div>

            <p className="securityNote mt-3">Files are encrypted and stored securely.</p>

            <button className="updateBtn mt-3" onClick={handleFiledComplaint}>Submit Complaint</button>
            {error.fields && <p className=" text-center mt-3" style={{color : "red" , fontSize:"12px"}}>{error.fields}</p>}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FileComplaint;
