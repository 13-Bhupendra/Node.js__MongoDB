import React, { useState } from 'react'
import Navbar from '../../components/Navbar.jsx'
import LOGO from "../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer.jsx'
import axios from 'axios'


const Otp_Verification = () => {
    const [otp , setOtp] = useState("")
    const [isVerify , setIsVerify] = useState(false)
  
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL


    const handleOtpVerifyReq = async () => {
        if (otp.length !== 6) {
          alert("Enter valid 6 digit OTP");
          return;
        }

        try {
          const email = localStorage.getItem("email");
          setIsVerify(true);

          const res = await axios.post(
            `${BASE_URL}/api/otp/verify`,
            { email, otp },
            { withCredentials: true }
          );

          if (res.data.status === true) {
          
            alert(res.data.message);
            navigate("/", { replace: true });
            window.location.reload();

            localStorage.removeItem("email");

          } else {
            alert(res.data.message);  
          }

        } catch (error) {
          alert(error.response?.data?.message || "OTP verification failed");
        } finally {
          setIsVerify(false); 
        }
      };

    
  return (
    <div className='mainSection'>
      <div className="d-flex justify-content-center">
        <Navbar PageName="Verify OTP" />

        <div className="signUpFormContainer mt-5 mb-5">
          <div className="formHeader p-3">
            <div className="headerLogo me-2">
              <img src={LOGO} alt="" />
            </div>
            <div className="headerText">
              <h1 className="fw-bold" style={{ color: "lightcyan" }}>
                Verify OTP 
              </h1>
              <p style={{ color: "whitesmoke" }}>
                Secure verification to proceed
              </p>
            </div>
          </div>

       {isVerify   ?
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
              <p className='text-center mt-5 fs-3 fw-bold' style={{color : "#1667b2"}}>Verifying....</p>
          </div>
            :
            <div className="form">

              {/* mobile */}
              <section className="mt-4">
                <label htmlFor="">OTP</label> <br />
                <input
                  type="number"
                  className="input mb-2"
                  placeholder="* * * * * *"
                  value={otp}
                  onChange={(e)=> setOtp(e.target.value)}
                />
                <p style={{color : "red" , fontSize:"12px"}}>*This OTP is valid for 3 mintutes.</p>
              </section>

              <button className="registerBtn mt-4" onClick={handleOtpVerifyReq}>Verify OTP</button>

              <p className="loginText mt-3">
                <span onClick={() => navigate("/auth/signin")}>Resent OTP</span>
              </p>
            </div>
        }
        
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Otp_Verification
