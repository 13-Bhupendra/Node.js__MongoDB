import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import "../../style/myComplaint.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const  ManageComplaints = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL

  const [complaints , setComplaints] = useState([])
  const [loading , setLoading] = useState(true)

  const getAllComplaints = async ()=>{
    try {
        setLoading(true)
        
        const res = await axios.get(`${BASE_URL}/api/all-Complaints` , {withCredentials : true});
        if(res.data.status){
          setComplaints(res.data.complaints)
        }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  console.log(complaints)

  useEffect(()=>{
      getAllComplaints();
  } , [])

  return (
    <div className="mainSection">
      <Navbar PageName="My Complaints" />

      <div className="allComplaintsContainer p-5">
        <div className="headings">
          <h2 className="pageTitle d-flex align-items-center gap-3" style={{ color: "lightcyan" }}>
            <span style={{ borderLeft: "5px solid var(--borderColor)" }}></span>
            Complaints
          </h2>
        </div>

        <div className="complaintsTable table-responsive mt-5">
          <table className="table  tab text-light complaints-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Complaint ID</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Crime Type</th>
                    <th>Assigned Investigator</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
              {loading 
              ? 
                  <p className='ps-3 mt-5 fs-3 fw-bold' style={{color : "#1667b2"}}>loading.....</p>
              : 
                (complaints.length <=0 ) ?
                <p className='ps-3 mt-5 fs-3 fw-bold' style={{color : "#1667b2"}}>No Complaint Filed Yet !</p>
              :
                complaints.map((el , i)=>(
                  <tr>
                    <td>{i +1}</td>
                    <td>{el.complaintId}</td>
                    <td>NAME : {el.userId.name}<br />{el.userId.email}</td> 
                    <td>{el.title}</td>
                    <td>{el.crimeType}</td>
                    <td>{el.assignedInvestigator?.email || "Not Assigned"}</td>
                    <td>{el.incidentDate}</td>
                    <td>
                      <span className={`status ${el.status}`}>{el.status}</span>
                    </td>
                    <td>
                      <button className="viewBtn" onClick={()=>navigate(`/admin/complaint/detail/${el._id}`)}>View & Assign</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageComplaints;
