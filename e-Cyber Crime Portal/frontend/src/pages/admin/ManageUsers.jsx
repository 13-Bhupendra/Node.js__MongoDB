import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import "../../style/manageUserAndInvestigator.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageUsers = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [error, setError] = useState({});

  // ===== GET ALL USERS =====
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/getAll/users`,
        { withCredentials: true }
      );

      if (res.data.status) {
        setUsers(res.data.users);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ===== UPDATE USER =====
  const handleUpdateUser = async () => {
    try {
      setError({});
      const res = await axios.put(
        `${BASE_URL}/api/admin/user/${selectedId}`,
        { name: editName, email: editEmail },
        { withCredentials: true }
      );

      if (res.data.status) {
        document.querySelector(
          "#editUserModal .btn-close"
        )?.click();
        getAllUsers();
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
      } else {
        console.log(err);
      }
    }
  };

  // ===== DELETE USER =====
  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/admin/user/${id}`,
        { withCredentials: true }
      );

      if (res.data.status) {
        getAllUsers();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="mainSection">
      <Navbar PageName="Manage Users" />

      <div className="allComplaintsContainer p-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="pageTitle d-flex align-items-center gap-3">
            <span style={{ borderLeft: "5px solid var(--borderColor)" }}></span>
            Manage Users
          </h2>

          <button
            className="viewBtn"
            onClick={() => navigate("/admin/add/newMember")}
          >
            <FaPlus /> Add User
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
                <p className="ps-3 mt-5">Loading...</p>
              ) : users.length === 0 ? (
                <p className="ps-3 mt-5">No Users Found</p>
              ) : (
                users.map((el, i) => (
                  <tr key={el._id}>
                    <td>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.role}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="iconBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#editUserModal"
                        onClick={() => {
                          setSelectedId(el._id);
                          setEditName(el.name);
                          setEditEmail(el.email);
                          setError({});
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="iconBtn danger"
                        onClick={() => handleDeleteUser(el._id)}
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

      {/* ===== EDIT USER MODAL ===== */}
      <div className="modal fade" id="editUserModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content adminModal">
            <div className="modal-header">
              <h5 className="modal-title">Edit User</h5>
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
                <option>User</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="viewBtn" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="viewBtn" onClick={handleUpdateUser}>
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

export default ManageUsers;
