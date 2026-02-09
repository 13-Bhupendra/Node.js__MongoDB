import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import "../../style/myComplaint.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssignedComplaints = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAssignedComplaints = async () => {
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
    getAssignedComplaints();
  }, []);

  return (
    <div className="mainSection">
      <Navbar PageName="Assigned Complaints" />

      <div className="allComplaintsContainer p-5">
        <div className="headings">
          <h2
            className="pageTitle d-flex align-items-center gap-3"
            style={{ color: "lightcyan" }}
          >
            <span style={{ borderLeft: "5px solid var(--borderColor)" }}></span>
            Assigned Complaints
          </h2>
        </div>

        <div className="complaintsTable table-responsive mt-5">
          <table className="table tab text-light complaints-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Complaint ID</th>
                <th>User</th>
                <th>Title</th>
                <th>Crime Type</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="ps-3 mt-4 fs-3 fw-bold text-info">
                    Loading.....
                  </td>
                </tr>
              ) : complaints.length === 0 ? (
                <tr>
                  <td colSpan="8" className="ps-3 mt-4 fs-3 fw-bold text-info">
                    No Assigned Complaints
                  </td>
                </tr>
              ) : (
                complaints.map((el, i) => (
                  <tr key={el._id}>
                    <td>{i + 1}</td>
                    <td>{el.complaintId}</td>

                    <td>
                      NAME : {el.userId?.name || "N/A"}
                      <br />
                      {el.userId?.email || ""}
                    </td>

                    <td>{el.title}</td>
                    <td>{el.crimeType}</td>
                    <td>{new Date(el.createdAt).toLocaleDateString()}</td>

                    <td>
                      <span className={`status ${el.status}`}>
                        {el.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="viewBtn"
                        onClick={() =>
                          navigate(`/investigator/complaint/details/${el._id}`)
                        }
                      >
                        View Details
                      </button>
                    </td>
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

export default AssignedComplaints;
