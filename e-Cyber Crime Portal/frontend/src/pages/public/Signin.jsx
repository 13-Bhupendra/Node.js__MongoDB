import React, { useState } from 'react'
import Navbar from '../../components/Navbar.jsx'
import LOGO from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer.jsx';
import axios from 'axios';

const Signin = () => {

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [isOtpSending , setIsOtpSending] = useState(false)
  const [error , setError] = useState({});
  // const [globalMsg, setGlobalMsg] = useState(""); 

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL

  const handleSigninReq = async ()=>{
    const data = {
      email , password
    }
    
    try {
      setIsOtpSending(true)
      const res = await axios.post(`${BASE_URL}/api/signin` , data)

       if(res.data.status == true){
        localStorage.setItem("email" , email )
          navigate("/auth/otp/verify");
        }

        setEmail(""),setPassword("")
        
    } catch (error) {
        if (error.response?.data?.errors) {
          setError(error.response.data.errors);
        }
         if (error.response?.data?.message) {
             alert(error.response.data.message); 
            setEmail(""),setPassword("")
          }
    }finally{
      setIsOtpSending(false)
    }

  }

  return (
  <div className='mainSection' >
      <div className="d-flex justify-content-center">
        <Navbar PageName="Sign up" />

        <div className="signUpFormContainer mt-5 mb-5">
          <div className="formHeader p-3">
            <div className="headerLogo me-2">
              <img src={LOGO} alt="" />
            </div>
            <div className="headerText">
              <h1 className="fw-bold" style={{ color: "lightcyan" }}>
                Sign In
              </h1>
              <p style={{ color: "whitesmoke" }}>
                Welcome back! Sign in to continue
              </p>
            </div>
          </div>

        {isOtpSending ? 
        //loading
        <div className="loader">
              <div className="loading d-flex column justify-content-center mt-5 pt-5">
                <div className="honeycomb">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
            </div>
            <p className='text-center mt-5 fs-3 fw-bold' style={{color : "#1667b2"}}>OTP Sending.....</p>
        </div>
          :
          //Form
          <div className="form">
            {/* email  */}
            <section className="mt-5 ">
              <label htmlFor="">Email</label> <br />
              <input
                type="Email"
                className="input mb-2"
                placeholder="Enter your Email "
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
             {error.email && <p style={{color : "red" , fontSize:"12px"}}>{error.email}</p>}
            </section>

            {/* Password */}
            <section className="mt-4">
              <label htmlFor="">Password</label> <br />
              <input
                type="password"
                className="input mb-2"
                placeholder="Create Password "
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              {error.password && <p style={{color : "red" , fontSize:"12px"}}>{error.password}</p>}
            </section>

            <div className="formExtras mt-3">
              <span className="forgotText" onClick={()=> navigate("/auth/reset/forget/password")}>Forgot password?</span>
            </div>

            <button className="registerBtn mt-4" onClick={handleSigninReq}>{isOtpSending ? "OTP Sending" :  "Sign In"}</button>
              {error.fields && <p style={{color : "red" , fontSize:"12px"}}>{error.fields}</p>}

            <p className="loginText mt-3">
              Do not have an account ? {" "}
              <span onClick={() => navigate("/auth/signup")}>Sign up</span>
            </p>
          </div>}

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signin
