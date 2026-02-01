import React, { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaHourglassHalf,
  FaUserCheck,
  FaCheckCircle,
  FaArrowRight 
} from "react-icons/fa";
import "../../style/dashboard.css";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardCards = () => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL

    const [complaints , setComplaints] = useState([])
    const [loading , setLoading] = useState(true)

    const getAllComplaints = async ()=>{
      try {
          setLoading(true)
          
          const res = await axios.get(`${BASE_URL}/api/my-complaints` , {withCredentials : true});
          if(res.data.status){
            setComplaints(res.data.complaints)
          }
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
        getAllComplaints();
    } , [])


  return (
    <div className="mainSection">
      <Navbar PageName="Dashboard "/>

       <div className="headings ps-5 pt-4 pb-4">
          <h2 className="pageTitle d-flex align-items-center gap-3" style={{ color: "lightcyan" }}>
            <span style={{ borderLeft: "5px solid var(--borderColor)" }}></span>
             Dashboard
          </h2>
          <p className="" style={{color : "gray"}}>Welcome back. Here's your complaint summary.</p>
        </div>

      <div className="dashSection">
        <div className="statsGrid">
          <div className="statCard">
            <div className="iconWrap blue"><FaFileAlt /></div>
            <h4>{complaints.length  }</h4>
            <p>Total Complaints</p>
            <span className="up">0.43% ↑</span>
          </div>

          <div className="statCard">
            <div className="iconWrap purple"><FaHourglassHalf /></div>
            <h4>{complaints.filter(( el)=> el.status === "pending").length}</h4>
            <p>Pending Complaints</p>
            <span className="up">4.35% ↑</span>
          </div>

          <div className="statCard">
            <div className="iconWrap cyan"><FaUserCheck /></div>
            <h4>{complaints.filter(( el)=> el.status === "assigned").length}</h4>
            <p>Assigned Complaints</p>
            <span className="up">2.59% ↑</span>
          </div>

          <div className="statCard">
            <div className="iconWrap green"><FaCheckCircle /></div>
            <h4>{complaints.filter(( el)=> el.status === "resolved").length}</h4>
            <p>Resolved Complaints</p>
            <span className="down">0.95% ↓</span>
          </div>
        </div>

        <div className="tableWrap">
          <div className="d-flex align-items-center justify-content-between">
              <h5 className="m-3 fw-bold"  style={{color:"lightcyan"}}>Recent Complaints</h5>
              <button className="viewMoreBtn" onClick={()=>navigate("/user/complaints")}>View More &nbsp; <FaArrowRight /></button>
          </div>
          <table className="dashTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
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
                complaints.slice(-3).reverse().map((el)=>(
                   <tr>
                    <td>{el.complaintId}</td>
                    <td>{el.title}</td>
                    <td>{el.crimeType}</td>
                    <td>{el.incidentDate}</td>
                    <td className={`${el.status}`}><FaHourglassHalf /> {el.status}</td>
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

export default DashboardCards;