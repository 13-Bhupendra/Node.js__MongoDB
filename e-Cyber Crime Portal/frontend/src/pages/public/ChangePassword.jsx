import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import LOGO from "../../assets/images/logo.png";
import Footer from "../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
    const navigate = useNavigate();

    const [oldPassword , setOldPassword] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const [email , setEmail] = useState("")
    const [error , setError] = useState("")

    //fetch data
      const fetchUser = async () => {
        try {
        const res = await axios.get(
            `${BASE_URL}/api/me`,
            { withCredentials: true }
        );
        if (res.data.status) {
            const u = res.data.user;
            setEmail(u.email);
        }
        } catch (error) {
         console.log(error.message);
        }
    };


    //handle change password
    const handleChangePassword = async ()=>{
        setError("");
        
        try {
            const res = await axios.post(`${BASE_URL}/api/changePassword` ,{ email ,oldPassword , newPassword} , {withCredentials : true});

            if(res.data.status){
                alert(res.data.message);
                navigate("/")
                setNewPassword(""), setOldPassword("")
            }
        } catch (error) {
            console.log(error)
            setError(error.response.data.message);
        }
    }

    useEffect(()=>{
        fetchUser()
    } , [])
  return (
    <div className="mainSection">
      <Navbar PageName="Change Password" />

      <div className="changePasswordContainer d-flex justify-content-center">
        <div className="signUpFormContainer mt-5 mb-5">
          <div className="formHeader p-3">
            <div className="headerLogo me-2">
              <img src={LOGO} alt="" />
            </div>
            <div className="headerText">
              <h1 className="fw-bold" style={{ color: "lightcyan" }}>
                Password Reset
              </h1>
              <p style={{ color: "whitesmoke" }}>
                Change your password 
              </p>
            </div>
          </div>

          <div className="form">
            <section className="mt-5 ">
              <label htmlFor="">Old Password</label> <br />
              <input
                type="password"
                className="input mb-2"
                placeholder="Enter your old password "
                onChange={(e)=>setOldPassword(e.target.value)}
                value={oldPassword}
              />
            </section>

             <section className="mt-4">
              <label htmlFor="">New Password</label> <br />
              <input
                type="password"
                className="input mb-2"
                placeholder="Enter your New password "
                onChange={(e)=>setNewPassword(e.target.value)}
                value={newPassword}
              />
            </section>

            <button className="registerBtn mt-4 mb-2 " onClick={handleChangePassword}>Change Password</button>
             {<p className='text-center' style={{color : "red" , fontSize:"12px"}}>{error}</p>}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChangePassword;
