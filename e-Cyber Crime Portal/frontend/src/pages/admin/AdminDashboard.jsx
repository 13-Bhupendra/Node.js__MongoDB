import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaUserShield,
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [investigators, setInvestigators] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ALL DATA =================
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [complaintRes, userRes, investigatorRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/all-Complaints`, { withCredentials: true }),
        axios.get(`${BASE_URL}/api/getAll/Users`, { withCredentials: true }),
        axios.get(`${BASE_URL}/api/getAll/Investigators`, { withCredentials: true }),
      ]);

      if (complaintRes.data.status)
        setComplaints(complaintRes.data.complaints);

      if (userRes.data.status)
        setUsers(userRes.data.users);

      if (investigatorRes.data.status)
        setInvestigators(investigatorRes.data.investigators);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ================= COUNTS =================
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;
  const pendingAssignedCount = complaints.filter(
    c => c.status === "pending" || c.status === "assigned"
  ).length;

  return (
    <div className="mainSection">
      <Navbar PageName="Admin Dashboard" />

      <div className="headings ps-5 pt-4 pb-4">
        <h2 className="pageTitle d-flex align-items-center gap-3" style={{ color: "lightcyan" }}>
          <span style={{ borderLeft: "5px solid var(--borderColor)" }}></span>
          Dashboard
        </h2>
        <p style={{ color: "gray" }}>
          Overview of users, investigators and complaints
        </p>
      </div>

      <div className="dashSection">
        {/* ================= STATS ================= */}
        <div className="statsGrid">
          <div className="statCard">
            <div className="iconWrap blue"><FaUsers /></div>
            <h4>{users.length + investigators.length}</h4>
            <p>Total Members</p>
          </div>

          <div className="statCard">
            <div className="iconWrap cyan"><FaUserShield /></div>
            <h4>{users.length}</h4>
            <p>Total Users</p>
          </div>

          <div className="statCard">
            <div className="iconWrap purple"><FaUserTie /></div>
            <h4>{investigators.length}</h4>
            <p>Total Investigators</p>
          </div>

          <div className="statCard">
            <div className="iconWrap blue"><FaFileAlt /></div>
            <h4>{complaints.length}</h4>
            <p>Total Complaints</p>
          </div>

          <div className="statCard">
            <div className="iconWrap green"><FaCheckCircle /></div>
            <h4>{resolvedCount}</h4>
            <p>Resolved Complaints</p>
          </div>

          <div className="statCard">
            <div className="iconWrap purple"><FaHourglassHalf /></div>
            <h4>{pendingAssignedCount}</h4>
            <p>Pending / Assigned</p>
          </div>
        </div>

        {/* ================= RECENT COMPLAINTS ================= */}
        <div className="tableWrap mb-4">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="m-3 fw-bold" style={{ color: "lightcyan" }}>
              Recent Complaints
            </h5>
            <button className="viewMoreBtn" onClick={() => navigate("/admin/manage/complaints")}>
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
                <tr><td colSpan="3">Loading...</td></tr>
              ) : complaints.length === 0 ? (
                <tr><td colSpan="3">No Complaints Found</td></tr>
              ) : (
                complaints.slice(-3).reverse().map(c => (
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

        {/* ================= RECENT USERS ================= */}
        <div className="tableWrap mb-4">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="m-3 fw-bold" style={{ color: "lightcyan" }}>
              Recent Users
            </h5>
            <button className="viewMoreBtn" onClick={() => navigate("/admin/manage/users")}>
              View More <FaArrowRight />
            </button>
          </div>

          <table className="dashTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(-3).reverse().map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= RECENT INVESTIGATORS ================= */}
        <div className="tableWrap">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="m-3 fw-bold" style={{ color: "lightcyan" }}>
              Recent Investigators
            </h5>
            <button className="viewMoreBtn" onClick={() => navigate("/admin/manage/investigators")}>
              View More <FaArrowRight />
            </button>
          </div>

          <table className="dashTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {investigators.slice(-3).reverse().map(i => (
                <tr key={i._id}>
                  <td>{i.name}</td>
                  <td>{i.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
