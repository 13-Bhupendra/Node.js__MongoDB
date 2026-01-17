import React, { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import "../../style/authPages.css";
import LOGO from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import axios from "axios";

const Signup = () => {
  const [name , setName] = useState("");
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [error , setError] = useState({})

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const handleSignupReq = async ()=>{
    const data = {
      name , email  , password , role : "user"
    }
    try {
        const res = await axios.post(`${BASE_URL}/api/signup` , data)

        if(res.data.status == true){
          navigate("/auth/signin");
          alert("Registration Successfull !")
        }
        
        setEmail(""),setName(""),setPassword("")
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
      <div className="d-flex justify-content-center">
        <Navbar PageName="Sign up" />

        <div className="signUpFormContainer mt-5 mb-5">
          <div className="formHeader p-3">
            <div className="headerLogo me-2">
              <img src={LOGO} alt="" />
            </div>
            <div className="headerText">
              <h1 className="fw-bold" style={{ color: "lightcyan" }}>
                User Registration
              </h1>
              <p style={{ color: "whitesmoke" }}>
                Create account to file complaints
              </p>
            </div>
          </div>

          <div className="form">
            {/* name and role input  */}
            <div className="nameAndRole d-flex justify-content-between mt-5 gap-3">
              <section className="w-100">
                <label htmlFor="">Username</label> <br />
                <input
                  type="text"
                  className="input mb-2"
                  placeholder="Enter your Username :"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                {error.name   && <p style={{color : "red" , fontSize:"12px"}}>{error.name}</p>}
              </section>

              <section className="w-100">
                <label htmlFor="">Role</label> <br />
                <input
                  type="text"
                  className="input mb-2"
                  value="USER"
                  disabled
                  style={{
                    background: "linear-gradient(135deg, #0F2436, #090E1A)",
                    color: "grey",
                  }}
                />
              </section>
            </div>

            {/* email  */}
            <section className="mt-3 ">
              <label htmlFor="">Email</label> <br />
              <input
                type="Email"
                className="input mb-2"
                placeholder="Enter your Email "
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />
              {error.email   && <p style={{color : "red" , fontSize:"12px"}}>{error.email}</p>}
            </section>

            {/* mobile */}
            <section className="mt-4">
              <label htmlFor="">Password</label> <br />
              <input
                type="password"
                className="input mb-2"
                placeholder="Create Password "
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              {error.password   && <p style={{color : "red" , fontSize:"12px"}}>{error.password}</p>}
            </section>

            <button className="registerBtn mt-4 mb-2" onClick={handleSignupReq}>Register</button>
            {error.fields   && <p style={{color : "red" , fontSize:"12px"}}>{error.fields}</p>}

            <p className="loginText mt-3">
              Already registered?{" "}
              <span onClick={() => navigate("/auth/signin")}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Signup;
