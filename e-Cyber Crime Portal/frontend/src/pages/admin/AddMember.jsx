import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import "../../style/addMember.css";
import LOGO from "../../assets/images/logo.png";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const AddMember = () => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [role , setRole] = useState("")
    const [password , setPassword] = useState("")
    const [error , setError] = useState("")

    const handleAddMember = async ()=>{
      const data = {
        name , email  , password , role
      }
      try {

          const res = await axios.post(`${BASE_URL}/api/signup` , data)

          if(res.data.status == true){
            
            if(role === "investigator")navigate("/admin/manage/investigators");
            if(role === "user")navigate("/admin/manage/users");

            alert("Member Added Successful !")
          }
          
          setEmail(""),setName(""),setPassword("").role("")
      } catch (error) {
          const backendErrors = error.response?.data?.errors
          if(backendErrors){
            setError(backendErrors)

            if(backendErrors.userExist){
              alert(backendErrors.userExist);
              navigate("/auth/signin");
            }
          }
      }
    }


  return (
    <div className="mainSection">
      <Navbar PageName="Add Member" />

      <div className="actionBTN mx-5 mt-4">
        <button className="actionBtn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="d-flex justify-content-center">
        <div className="addMemberContainer mt-4 mb-5">
          <div className="formHeader p-3">
            <div className="headerLogo me-3">
              <img src={LOGO} alt="" />
            </div>
            <div className="headerText">
              <h1 className="fw-bold">Add Member</h1>
              <p>Create User or Investigator account</p>
            </div>
          </div>

          <div className="form">
            <div className="nameAndRole d-flex justify-content-center align-items-center gap-3 mt-5">
              <section className="w-100">
                <label>Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                {error.name   && <p style={{color : "red" , fontSize:"12px"}}>{error.name}</p>}
              </section>

              <section className="w-100">
                <label>Role</label>
                <select value={role} className="input" onChange={(e)=> setRole(e.target.value) }>
                  <option value="">Select Role</option>
                  <option value="user">user</option>
                  <option value="investigator">investigator</option>
                </select>
                {error.role   && <p style={{color : "red" , fontSize:"12px"}}>{error.role}</p>}
              </section>
            </div>

            <section className="mt-4">
              <label>Email</label>
              <input
                type="email"
                className="input"
                placeholder="Enter email address"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              {error.email   && <p style={{color : "red" , fontSize:"12px"}}>{error.email}</p>}
            </section>

            <section className="mt-4">
              <label>Password</label>
              <input
                type="password"
                className="input"
                placeholder="Create password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              {error.password   && <p style={{color : "red" , fontSize:"12px"}}>{error.password}</p>}
            </section>

            <button className="addMemberBtn mt-4" onClick={handleAddMember}>Add Member</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddMember;
