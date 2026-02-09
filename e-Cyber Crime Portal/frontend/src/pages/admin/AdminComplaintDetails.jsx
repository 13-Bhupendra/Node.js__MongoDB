import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import "../../style/ComplaintDetails.css";
import {
  FaRegUser,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaAlignLeft,
  FaPaperclip,
  FaUserShield,
  FaArrowLeft,
  FaDownload,
} from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import axios from "axios";

const AdminComplaintDetails = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
  const { id } = useParams();

  const [complaint, setComplaint] = useState([]);
  const [investigators , setInvestigators] = useState([]);
  const [selectInvestigator , setSelectInvestigator] = useState("")
  const [ errors , setErrors] = useState("") 

  // Get All complaints
  const getComplaint = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/view/complaint?id=${id}`,
        { withCredentials: true }
      );

      if (res.data.status) {
        setComplaint(res.data.complaint);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get All investigators
  const getAllInvestigators = async ()=>{
        try {
        const res = await axios.get(
            `${BASE_URL}/api/getAll/Investigators`,
            { withCredentials: true }
        );


        if (res.data.status) {
            setInvestigators(res.data.investigators);
        }
        } catch (error) {
             console.log(error);
        }
  }

  //assigned complaints 
  const handleAssignedComplaint = async ()=>{
    try {
        const res = await axios.put(`${BASE_URL}/api/assign/Complaint` , 
            {
                id : complaint._id,
                investigatorId : selectInvestigator
            }
        )
        if(res.data.status){
            alert(res.data.message)
            window.location.reload()
        }
    } catch (error) {
        if(error.response?.data?.message){
          setErrors(error.response.data.message)
        }
    }
  }
  


  useEffect(() => {
    getComplaint();
    getAllInvestigators()
  }, []);

  return (
    <div className="mainSection">
      <Navbar PageName="View Complaint" />

      <div className="viewComplaintContainer m-5">
        <div className="headings mb-4">
          <h2 className="pageTitle d-flex align-items-center gap-3">
            <span style={{ borderLeft: "5px solid var(--borderColor)" }}></span>
            View & Assign Complaint
          </h2>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div className="d-flex gap-2">
            <button className="actionBtn" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Back
            </button>

            <button className="actionBtn primary">
              <FaDownload /> Download
            </button>
          </div>

       {!(complaint.assignedInvestigator )?  <button
            className="actionBtn primary"
            data-bs-toggle="modal"
            data-bs-target="#assignComplaintModal"
          >
            Assign Complaint
          </button> : ""}
          
        </div>

        <div className="row g-4 complaintDetailsContent">
          <div className="col-lg-8">
            <div className="detailBox">
              <div className="topHeader">
                <div>
                  <h5 className="cid">{complaint.complaintId}</h5>
                  <p className="ctitle">{complaint.title}</p>
                </div>
                <span className={`statusBadge ${complaint.status}`}>
                  {complaint.status}
                </span>
              </div>

              <div className="row infoGrid mt-3">
                <div className="col-md-4">
                  <span className="label">Full Name</span>
                  <p className="value">{complaint.fullName}</p>
                </div>
                <div className="col-md-4">
                  <span className="label">Parent Name</span>
                  <p className="value">
                    {complaint.fatherOrMotherName}
                  </p>
                </div>
                <div className="col-md-4">
                  <span className="label">Gender</span>
                  <p className="value">{complaint.gender}</p>
                </div>

                <div className="col-md-4">
                  <span className="label">Crime Type</span>
                  <p className="value">{complaint.crimeType}</p>
                </div>
                <div className="col-md-4">
                  <span className="label">Incident Date</span>
                  <p className="value">{complaint.incidentDate}</p>
                </div>
                <div className="col-md-4">
                  <span className="label">Incident Time</span>
                  <p className="value">{complaint.incidentTime}</p>
                </div>

                <div className="col-md-6">
                  <span className="label">Website / App</span>
                  <p className="value">
                    {complaint.websiteOrAppName}
                  </p>
                </div>
                <div className="col-md-6">
                  <span className="label">Amount Lost</span>
                  <p className="value danger">
                    {"₹" + complaint.amountLost || ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="detailBox mt-4">
              <h6 className="sectionTitle">
                <span className="iconWrap desc">
                  <FaAlignLeft />
                </span>
                Incident Description
              </h6>
              <p className="desc">{complaint.description}</p>
            </div>

            <div className="detailBox mt-4">
              <h6 className="sectionTitle">
                <span className="iconWrap upload">
                  <FaPaperclip />
                </span>
                Uploaded Evidence
              </h6>
              <div className="evidenceRow">
                <FaFileAlt />
                <img
                  src={`${BASE_URL}${complaint.filePath}`}
                  alt=""
                  height="200"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="detailBox">
              <h6 className="sectionTitle">
                <span className="iconWrap investigator">
                  <FaUserShield />
                </span>
                Investigator Details
              </h6>

              {complaint.assignedInvestigator ? (
                <div className="navProfile d-flex pe-3">
                  <div className="profileLogo d-flex justify-content-center align-items-center">
                    <FaRegUser />
                  </div>
                  <div className="profileLogoText ps-3">
                    <h6 className="m-0">
                      {complaint.assignedInvestigator.name}
                    </h6>
                    <span>
                        {complaint.assignedInvestigator.email}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="emptyText">
                  No investigator assigned yet
                </p>
              )}

              <div className="noteBox mt-3">
                <span className="noteLabel">
                  Official Remark
                </span>

                {complaint.investigatorNote ? (
                  <p className="noteText">
                      {complaint.investigatorNote}
                  </p>
                ) : (
                  <p className="emptyText">
                    No official note added yet
                  </p>
                )}
              </div>
            </div>

            <div className="detailBox mt-4">
              <h6 className="sectionTitle">
                <span className="sectionIcon">
                  <FaTasks />
                </span>
                Investigation Status
              </h6>

              <ul className="statusTimeline">
                <li className="done">
                  <FaCheckCircle /> Complaint Filed
                </li>
                <li className="done">
                  <FaCheckCircle /> Verified
                </li>
                <li className="active">
                  <FaHourglassHalf /> Under Investigation
                </li>
                <li>
                  <FaTimesCircle /> Resolved
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="assignComplaintModal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content assignModal">
            <div className="modal-header">
              <h5 className="modal-title">
                Assign Investigator
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <label className="modalLabel">
                Select Investigator
              </label>
              <select className="modalSelect" onChange={(e)=>setSelectInvestigator(e.target.value)}>
                <option>Select Investigator </option>
                {investigators.length <=0 ? <option> Investigator Not Available Yet ! </option> : 
                
                    investigators.map((el)=>(
                        <option key={el._id} value={el._id} >{el.name} &nbsp; ( {el.email} )</option>
                    ))
                }
              </select>
             {errors && <p style={{color : "red" , fontSize:"12px"}}>{errors}</p>}
            </div>

            <div className="modal-footer">
              <button
                className="actionBtn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button className="actionBtn primary" onClick={handleAssignedComplaint}>
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminComplaintDetails;
