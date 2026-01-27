import React, { use, useState } from 'react'
import Footer from '../../components/Footer'
import LOGO from "../../assets/images/logo.png"
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const OtpVerify_CreatePassword = () => {
  const email = localStorage.getItem("email")
  const [otp , setOtp] = useState("")
  const [newPassword , setNewPassword] = useState("")
  const [error , setError] = useState("")

  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL

  const handleResetForgetPasswordReq = async()=>{
      try {
          const res = await axios.post(`${BASE_URL}/api/otp/verify/create/newPassword` , {email : email , otp , newPassword})
          
          if(res.data.status === true){
            alert(res.data.message)
            navigate("/auth/signin")
          }

          setOtp("") , setNewPassword("")
          
      } catch (error) {
        if(error.response?.data?.message){
          setError(error.response.data.message)
        }
      }finally{
      }
  }

  return (
 <div className='mainSection' >
      <div className="d-flex justify-content-center">
        <Navbar PageName="Reset Forget Password" />

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
                Welcome back! Sign in to continue
              </p>
            </div>
          </div>

          <div className="form">
            <section className="mt-5 ">
              <label htmlFor="">OTP</label> <br />
              <input
                type="text"
                className="input mb-2"
                placeholder="Enter valid OTP "
                onChange={(e)=>setOtp(e.target.value)}
                value={otp}
              />
            </section>


             <section className="mt-4">
              <label htmlFor="">New Password</label> <br />
              <input
                type="password"
                className="input mb-2"
                placeholder="Create New Password "
                onChange={(e)=>setNewPassword(e.target.value)}
                value={newPassword}
              />
            </section>


            <button className="registerBtn mt-4 mb-2" onClick={handleResetForgetPasswordReq}>Update</button>
             {<p className='text-center' style={{color : "red" , fontSize:"12px"}}>{error}</p>}

          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OtpVerify_CreatePassword
