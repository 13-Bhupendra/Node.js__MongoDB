import React, { useEffect, useState } from 'react'
import ProfileImage from "../assets/images/profIcon.png"
import { MdOutlineMailOutline, MdLocationOn, MdOutlineLogout } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { FaUser, FaHashtag, FaCity, FaMapMarkedAlt  , FaUserTie , } from "react-icons/fa";
import { BsShieldExclamation } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProfileCard = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
  const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [designation , setDesignation]  = useState("")
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [errors, setErrors] = useState({});

    const firstLetter = name.substring(0,1).toUpperCase()

    //fetched admin profile 
    const fetchedAdmin = async ()=>{
      try {
          const res = await axios.get(`${BASE_URL}/api/adminProfile/details` , {withCredentials : true})

          if(res.data.status){
            const a = res.data.admin;
            setEmail(a.email);
            setRole(a.role);
            setCity(a.city);
            setDesignation(a.designation);
            setName(a.name)
            setState(a.state)
            setPhone(a.phone);
          }
      } catch (error) {
         console.log(error.message);
      }
    }

    //handle update admin profile
    const handleUpdateAdminProfileDetails = async ()=>{
      setErrors({})
      
      try {
          const res = await axios.put(`${BASE_URL}/api/update/adminProfile/details` , {phone , designation , city , state} , {withCredentials : true})

          if(res.data.status){
            alert(res.data.message)
            fetchedAdmin()
          }
      } catch (error) {
        if(error.response?.data?.errors){
          setErrors(error.response.data.errors);
          console.log(errors)
        }
      }
    }

    //handle Signout 
    const handleSignout = async ()=>{
        try {
            const res = await axios.post(`${BASE_URL}/api/signout` , {},
                { withCredentials: true }
              )

              if(res.data.status === true){
                alert(res.data.message);
                navigate("/auth/signin")
                window.location.reload()

              }
        } catch (error) {
          console.log(error.response.data.message)
        }
    }

    useEffect(()=> {
      fetchedAdmin()
    } , []);

  return (
    <div className='userProfileCard d-flex justify-content-center'>
      <div className="row w-100 justify-content-center p-5">

        <div className="col-lg-4 col-md-12">
          <div className="profileMainContentCard">
            <div className="cardheader"></div>

             <div className="d-flex justify-content-center">
              <div className="profileImage d-flex justify-content-center align-items-center">
                    <span className="profileLetter">
                      {firstLetter || "A"}
                    </span>
              </div>
            </div>

            <div className="profileInfo text-center d-flex align-items-center">
              <h4 className="fw-bold" style={{color:"lightcyan"}}>{name}</h4>
              <div className="roleIcon">{role}</div>

              <p className="m-0 text-muted small">
                <MdOutlineMailOutline /> {email}
              </p>
              <p className="m-0 mt-1 text-muted small">
                <LuPhone /> {phone || "Not added"}
              </p>

              <div className="logOutBtn">
                <button onClick={handleSignout}>Log out <MdOutlineLogout/></button>
              </div>
            </div>
          </div>

         <div className="accountStatusCard mt-4 mb-4">
            <div className="statusRow">
              <span>Email Verified</span>
              <span className={`statusBadge ${email ? "verified" : "pending" }`}>{email ? "Verified" : "Pending"}</span>
            </div>
            <div className="statusRow">
              <span>Phone Verified</span>
              <span className={`statusBadge ${phone ? "verified" : "pending" }`}>{phone ? "Verified" : "Pending"}</span>
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
                <input value={name} disabled />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><MdOutlineMailOutline/></div>
              <div className="formContent">
                <label>EMAIL ADDRESS</label>
                <input value={email} disabled />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><LuPhone/></div>
              <div className="formContent">
                <label>PHONE NUMBER</label>
                <input value={phone} type='tel' onChange={(e)=>setPhone(e.target.value)} placeholder='Enter your mobile number'/>
                 {errors.phone && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.personalPhone}
                  </p>
                )}
              </div>
            </div>

             <div className="formRow" style={{borderBottom:"none"}}>
              <div className="formIcon"><FiEdit2/></div>
              <div className="formContent passwordField">
                <label>PASSWORD</label>
                <div className="passwordInput">
                  <input type="password" value="* * * * * * * * * *" />
                </div>
                <p className=' fs-6 d-flex justify-content-end m-0' style={{color : "#1667b2" , cursor:"pointer"}}   onClick={()=>navigate("/auth/changePassword")}>Change Password ?</p>
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaUserTie/></div>
              <div className="formContent">
                <label>DESIGNATION</label>
                <select name="designation" required value={designation} onChange={(e)=>setDesignation(e.target.value)}>
                  <option value="">Select Designation</option>
                  <option>System Administrator</option>
                  <option>Portal Administrator</option>
                  <option>Cyber Crime Officer</option>
                  <option>Cyber Security Analyst</option>
                  <option>Nodal Officer</option>
                  <option>Super Admin</option>
                </select>
                 {errors.designation && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.designation}
                  </p>
                )}  
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaCity/></div>
              <div className="formContent">
                <label>CITY</label>
                <input value={city} onChange={(e)=> setCity(e.target.value)} placeholder="Enter your city" />
                 {errors.city && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaMapMarkedAlt/></div>
              <div className="formContent">
                <label>STATE</label>
                <input value={state} onChange={(e)=>setState(e.target.value)}  placeholder="Enter your state"/>
                 {errors.state && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <button className="updateBtn" onClick={handleUpdateAdminProfileDetails}>Update Profile</button>
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

export default AdminProfileCard
