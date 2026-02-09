import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  FaArrowLeft
} from "react-icons/fa";
import { FaTasks } from "react-icons/fa";

const InvestigatorComplaintDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const [complaint, setComplaint] = useState({});
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const getComplaint = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/view/complaint?id=${id}`,
        { withCredentials: true }
      );

      if (res.data.status) {
        setComplaint(res.data.complaint);
        setStatus(res.data.complaint.status);
        setNote(res.data.complaint.investigatorNote || "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/investigator/update-complaint`,
        {
          id: complaint._id,
          status,
          investigatorNote: note
        },
        { withCredentials: true }
      );

      if (res.data.status) {
        alert("Complaint updated");
        navigate(-1);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    getComplaint();
  }, []);

  const isResolved = complaint.status === "resolved";

  return (
    <div className="mainSection">
      <Navbar PageName="Complaint Details" />

      <div className="viewComplaintContainer m-5">
        <div className="d-flex justify-content-between mb-4">
          <button className="actionBtn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
        </div>

        <div className="row g-4">
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
                  <span className="label">Gender</span>
                  <p className="value">{complaint.gender}</p>
                </div>
                <div className="col-md-4">
                  <span className="label">Crime Type</span>
                  <p className="value">{complaint.crimeType}</p>
                </div>
              </div>
            </div>

            <div className="detailBox mt-4">
              <h6 className="sectionTitle">
                <span className="iconWrap desc">
                  <FaAlignLeft />
                </span>
                Description
              </h6>
              <p className="desc">{complaint.description}</p>
            </div>

            <div className="detailBox mt-4">
              <h6 className="sectionTitle">
                <span className="iconWrap upload">
                  <FaPaperclip />
                </span>
                Evidence
              </h6>
              {complaint.filePath && (
                <div className="evidenceRow">
                  <FaFileAlt />
                  <img
                    src={`${BASE_URL}${complaint.filePath}`}
                    height="200"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="detailBox">
              <h6 className="sectionTitle">
                <span className="iconWrap investigator">
                  <FaUserShield />
                </span>
                Update Status
              </h6>

              {isResolved ? (
                <p className="emptyText">Complaint already resolved</p>
              ) : (
                <>
                  <select
                    className="modalSelect mb-2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="assigned">Assigned</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <textarea
                    className="modalSelect"
                    rows="4"
                    placeholder="Investigation note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>

                  {error && (
                    <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
                  )}

                  <button
                    className="actionBtn primary mt-3"
                    onClick={handleUpdate}
                  >
                    Update Complaint
                  </button>
                </>
              )}
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
                <li className="active">
                  <FaHourglassHalf /> Under Investigation
                </li>
                <li className={isResolved ? "done" : ""}>
                  <FaTimesCircle /> Resolved
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvestigatorComplaintDetails;
