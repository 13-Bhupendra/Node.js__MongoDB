import React, { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaArrowRight,
} from "react-icons/fa";
import "../../style/dashboard.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InvestigatorDashboard = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvestigatorDashboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/investigator/assigned-complaints`,
        { withCredentials: true }
      );

      if (res.data.status) {
        setComplaints(res.data.complaints);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestigatorDashboard();
  }, []);

  const resolvedCount = complaints.filter(
    (c) => c.status === "resolved"
  ).length;

  
  return (
    <div className="mainSection">
      <Navbar PageName="Investigator Dashboard" />

      <div className="headings ps-5 pt-4 pb-4">
        <h2 className="pageTitle d-flex align-items-center gap-3" style={{ color: "lightcyan" }}>
          <span style={{ borderLeft: "5px solid var(--borderColor)" }}></span>
          Dashboard
        </h2>
        <p style={{ color: "gray" }}>
          Overview of assigned and resolved complaints
        </p>
      </div>

      <div className="dashSection">
        {/* ================= STATS ================= */}
        <div className="statsGrid">
          <div className="statCard">
            <div className="iconWrap blue"><FaFileAlt /></div>
            <h4>{complaints.length}</h4>
            <p>Total Assigned Complaints</p>
          </div>

          <div className="statCard">
            <div className="iconWrap green"><FaCheckCircle /></div>
            <h4>{resolvedCount}</h4>
            <p>Resolved Complaints</p>
          </div>
        </div>

        {/* ================= RECENT ASSIGNED COMPLAINTS ================= */}
        <div className="tableWrap">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="m-3 fw-bold" style={{ color: "lightcyan" }}>
              Recent Assigned Complaints
            </h5>
            <button
              className="viewMoreBtn"
              onClick={() => navigate("/investigator/complaints")}
            >
              View More <FaArrowRight />
            </button>
          </div>

          <table className="dashTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : complaints.length <= 0 ? (
                <tr>
                  <td colSpan="3">No Complaint Assigned Yet</td>
                </tr>
              ) : (
                complaints
                  .slice(-3)
                  .reverse()
                  .map((c) => (
                    <tr key={c._id}>
                      <td>{c.complaintId}</td>
                      <td>{c.title}</td>
                      <td className={c.status}>{c.status}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvestigatorDashboard;
