import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import "../../style/manageUserAndInvestigator.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageInvestigators = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const [investigators, setInvestigators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [error, setError] = useState({});

  const getAllInvestigators = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/getAll/Investigators`,
        { withCredentials: true }
      );

      if (res.data.status) {
        setInvestigators(res.data.investigators);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpdateInvestigator = async () => {
    try {
      setError({});
      const res = await axios.put(
        `${BASE_URL}/api/admin/investigator/${selectedId}`,
        { name: editName, email: editEmail },
        { withCredentials: true }
      );

      if (res.data.status) {
        const modalClose = document.querySelector(
          "#editInvestigatorModal .btn-close"
        );
        if (modalClose) modalClose.click();
        getAllInvestigators();
      }
    } catch (err) {
      if (err.response && err.response.data?.errors) {
        setError(err.response.data.errors);
      } else {
        console.log(err);
      }
    }
  };

  const handleDeleteInvestigator = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/admin/investigator/${id}`, {
        withCredentials: true,
      });

      if (res.data.status) {
        getAllInvestigators();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        // show a simple alert for errors; keep UI structure unchanged
        alert(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllInvestigators();
  }, []);

  return (
    <div className="mainSection">
      <Navbar PageName="Manage Investigators" />

      <div className="allComplaintsContainer p-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="pageTitle d-flex align-items-center gap-3" style={{ color: "lightcyan" }}>
            <span style={{ borderLeft: "5px solid var(--borderColor)" }}></span>
            Manage Investigators
          </h2>

          <button
            className="viewBtn"
            onClick={() => navigate("/admin/add/newMember")}
          >
            <FaPlus /> Add Investigator
          </button>
        </div>

        <div className="complaintsTable table-responsive mt-5">
          <table className="table text-light complaints-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <p className="ps-3 mt-5 fs-3 fw-bold" style={{ color: "#1667b2" }}>
                  loading.....
                </p>
              ) : investigators.length === 0 ? (
                <p className="ps-3 mt-5 fs-3 fw-bold" style={{ color: "#1667b2" }}>
                  Investigator Not Available Yet !
                </p>
              ) : (
                investigators.map((el, i) => (
                  <tr key={el._id || i}>
                    <td>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.role}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="iconBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#editInvestigatorModal"
                        onClick={() => {
                          setSelectedId(el._id);
                          setEditName(el.name || "");
                          setEditEmail(el.email || "");
                          setError({});
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="iconBtn danger"
                        onClick={() => handleDeleteInvestigator(el._id)}
                      >
                        <FaTrash />
                      </button>
                      
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal fade" id="editInvestigatorModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content adminModal">
            <div className="modal-header">
              <h5 className="modal-title">Edit Investigator</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <label className="modalLabel">Name</label>
              <input
                className="modalInput"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <label className="modalLabel mt-3">Email</label>
              <input
                className="modalInput"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />

              {error.email && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {error.email}
                </p>
              )}

              <label className="modalLabel mt-3">Password</label>
              <input
                value="********"
                disabled
                className="modalInput"
                type="password"
              />

              <label className="modalLabel mt-3">Role</label>
              <select className="modalSelect" disabled>
                <option>Investigator</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="viewBtn" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="viewBtn" onClick={handleUpdateInvestigator}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageInvestigators;
