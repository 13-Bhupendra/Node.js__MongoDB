import React from 'react'
import ProfileImage from "../assets/images/profIcon.png"
import { MdOutlineMailOutline, MdLocationOn, MdOutlineLogout } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { FaUser, FaHashtag, FaCity, FaMapMarkedAlt } from "react-icons/fa";
import { BsShieldExclamation } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvestigatorProfileCard = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
  const navigate = useNavigate()

  //handle Signout 
  const handleSignout = async ()=>{
      try {
          const res = await axios.post(`${BASE_URL}/api/signout` , {},
              { withCredentials: true }
            )
             localStorage.removeItem("role")

            if(res.data.status === true){
              alert(res.data.message);
              window.location.reload()
              navigate("/auth/signin")
            }
      } catch (error) {

      }
  }
  return (
    <div className='userProfileCard d-flex justify-content-center'>
      <div className="row w-100 justify-content-center p-5">

        <div className="col-lg-4 col-md-12">
          <div className="profileMainContentCard">
            <div className="cardheader"></div>

            <div className="d-flex justify-content-center">
              <div className="profileImage">
                <img src={ProfileImage} alt="" />
              </div>
            </div>

            <div className="profileInfo text-center d-flex align-items-center">
              <h4 className="fw-bold" style={{color:"lightcyan"}}>Bhupendra Patil</h4>
              <div className="roleIcon">User</div>

              <p className="m-0 text-muted small">
                <MdOutlineMailOutline /> bhupendrakp08@gmail.com
              </p>
              <p className="m-0 mt-1 text-muted small">
                <LuPhone /> +91 7887410258
              </p>

              <div className="logOutBtn">
                <button onClick={handleSignout}>Log out <MdOutlineLogout/></button>
              </div>
            </div>
          </div>

          <div className="accountStatusCard mt-4 mb-4">
            <div className="statusRow">
              <span>Email Verified</span>
              <span className="statusBadge verified">Verified</span>
            </div>
            <div className="statusRow">
              <span>Phone Verified</span>
              <span className="statusBadge pending">Pending</span>
            </div>
          </div>
        </div>

        <div className="col-lg-7 col-md-12">
          <div className="profileDetailsCard">

            <div className="personalHeader">
              <h5>Personal Information</h5>
              <p>Your registered details with e-Cyber Crime Portal</p>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaUser/></div>
              <div className="formContent">
                <label>FULL NAME</label>
                <input value="Bhupendra Patil" />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><MdOutlineMailOutline/></div>
              <div className="formContent">
                <label>EMAIL ADDRESS</label>
                <input value="bhupendrakp08@gmail.com" />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><LuPhone/></div>
              <div className="formContent">
                <label>PHONE NUMBER</label>
                <input value="+91 7887410258" />
              </div>
            </div>

             <div className="formRow" style={{borderBottom:"none"}}>
              <div className="formIcon"><FiEdit2/></div>
              <div className="formContent passwordField">
                <label>PASSWORD</label>
                <div className="passwordInput">
                  <input type="password" value="* * * * * * * * * *" />
                </div>
                <p className=' fs-6 d-flex justify-content-end m-0' style={{color : "#1667b2" , cursor:"pointer"}}>Change Password ?</p>
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaHashtag/></div>
              <div className="formContent">
                <label>PINCODE</label>
                <input value="440022" />  
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><MdLocationOn/></div>
              <div className="formContent">
                <label>ADDRESS</label>
                <input value="Shivaji Nagar, Near IT Park" />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaCity/></div>
              <div className="formContent">
                <label>CITY</label>
                <input value="Nagpur" />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaMapMarkedAlt/></div>
              <div className="formContent">
                <label>STATE</label>
                <input value="Maharashtra" />
              </div>
            </div>

            <button className="updateBtn">Update Profile</button>
          </div>

          <div className="securityNote">
            <BsShieldExclamation style={{fontSize:"40px"}} />
            <p>
              Your personal information is encrypted and stored securely in compliance
              with IT Act 2000 and government data protection guidelines. This information
              is used solely for complaint processing and investigation purposes.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InvestigatorProfileCard
