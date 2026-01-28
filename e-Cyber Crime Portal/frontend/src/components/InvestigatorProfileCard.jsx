import React, { use, useEffect, useState } from 'react'
import ProfileImage from "../assets/images/profIcon.png"
import { MdOutlineMailOutline, MdLocationOn, MdOutlineLogout } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { FaUser, FaHashtag, FaCity, FaMapMarkedAlt, FaUserTie, FaBuilding  , FaCalendarAlt  } from "react-icons/fa";
import { BsShieldExclamation } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InvestigatorProfileCard = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
  const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [officeEmail , setOfficeEmail] = useState("")
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [officialPhone , setOfficialPhone] = useState("");
    const [designation , setDesignation]  = useState("")
    const [department , setDepartment]  = useState("")
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [errors, setErrors] = useState({});

    const firstLetter = name.substring(0,1).toUpperCase()

    //fetch investigator data 
    const fetchedInvestigator = async ()=>{
        try {
            const res = await axios.get(`${BASE_URL}/api/investigatorProfile/details` , {withCredentials : true})

            if(res.data.status){
            const i = res.data.investigator;
            setEmail(i.email);
            setAddress(i.address);
            setDepartment(i.department)
            setJoiningDate(i.joiningDate)
            setOfficeEmail(i.officeEmail)
            setOfficialPhone(i.officialPhone)
            setRole(i.role);
            setCity(i.city);
            setDesignation(i.designation);
            setName(i.name)
            setState(i.state)
            setPhone(i.personalPhone);
            setPincode(i.pincode)
          }
        } catch (error) {
          console.log(error.message);
        }
    }

    //handle update investigator data
    const handleUpdateInvestigatorProfileDetails = async ()=>{
      setErrors({})

        try {
            const res = await axios.put(`${BASE_URL}/api/update/investigatorProfile/details` , 
              {personalPhone : phone , officeEmail ,officialPhone ,pincode , state , city , address , department , designation , joiningDate},
              {withCredentials : true})

            if(res.data.status){
              alert(res.data.message)
              fetchedInvestigator()
            }
        } catch (error) {
             if(error.response?.data?.errors){
              setErrors(error.response.data.errors);
              console.log(errors)
            }
            console.log(error)
        }
    }


  const handleSignout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/signout`, {}, { withCredentials: true })
      if (res.data.status === true) {
        alert(res.data.message);
        navigate("/auth/signin")
        window.location.reload()
      }
    } catch (error) {}
  }

  useEffect(()=>{
    fetchedInvestigator()
  } , [])

  return (
    <div className='userProfileCard d-flex justify-content-center'>
      <div className="row w-100 justify-content-center p-5">

        <div className="col-lg-4 col-md-12">
          <div className="profileMainContentCard">
            <div className="cardheader"></div>

            <div className="d-flex justify-content-center">
              <div className="profileImage d-flex justify-content-center align-items-center">
                    <span className="profileLetter">
                      {firstLetter || "I"}
                    </span>
              </div>
            </div>

            <div className="profileInfo text-center">
              <h4 className="fw-bold" style={{color:"lightcyan"}}>{name}</h4>
              <div className="roleIcon"  style={{display: "inline-block", width: "fit-content"}}>{role}</div>

              <p className="m-0 text-muted small">
                <MdOutlineMailOutline /> {email}
              </p>
              <p className="m-0 mt-1 text-muted small">
                <LuPhone />  {phone || "Not added"}
              </p>

              <div className="logOutBtn">
                <button onClick={handleSignout}>
                  Log out <MdOutlineLogout/>
                </button>
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

            <div className="row">
              <div className="col-md-6">
                <div className="formRow">
                  <div className="formIcon"><MdOutlineMailOutline/></div>
                  <div className="formContent">
                    <label>EMAIL ADDRESS</label>
                    <input value={email} disabled/>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="formRow">
                  <div className="formIcon d-flex d-md-none"><MdOutlineMailOutline/></div>
                  <div className="formContent">
                    <label>OFFICE EMAIL ADDRESS</label>
                    <input type="email" value={officeEmail} placeholder='Enter your office Email' onChange={(e)=>setOfficeEmail(e.target.value)} />
                     {errors.officeEmail && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.officeEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="formRow">
                  <div className="formIcon"><LuPhone/></div>
                  <div className="formContent">
                    <label>PERSONAL PHONE NUMBER</label>
                    <input type="tel" value={phone} placeholder='Enter your personal mobile number '  onChange={(e)=>setPhone(e.target.value)}/>
                      {errors.personalPhone && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.personalPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="formRow">
                  <div className="formIcon d-flex d-md-none"><LuPhone/></div>
                  <div className="formContent">
                    <label>OFFICIAL PHONE NUMBER</label>
                    <input type="tel" value={officialPhone} placeholder='Enter your official mobile number '  onChange={(e)=>setOfficialPhone(e.target.value)} />
                     {errors.officialPhone && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.officialPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FiEdit2/></div>
              <div className="formContent passwordField">
                <label>PASSWORD</label>
                <input type="password" value="************" />
                <p className="fs-6 text-end m-0" style={{color:"#1667b2", cursor:"pointer"}}    onClick={()=>navigate("/auth/changePassword")}>
                  Change Password ?
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="formRow">
                  <div className="formIcon"><FaUserTie/></div>
                  <div className="formContent">
                    <label>DESIGNATION</label>
                    <select value={designation}  onChange={(e)=>setDesignation(e.target.value)}>
                      <option>Investigating Officer</option>
                      <option>Sub-Inspector</option>
                      <option>Inspector</option>
                      <option>Case Investigating Officer</option>
                      <option>Law Enforcement Officer</option>
                      <option>Digital Evidence Examiner</option>
                    </select>
                     {errors.designation && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.designation}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="formRow">
                  <div className="formIcon"><FaBuilding/></div>
                  <div className="formContent">
                    <label>DEPARTMENT</label>
                    <select value={department}  onChange={(e)=>setDepartment(e.target.value)}>
                      <option>Cyber Crime Police Station</option>
                      <option>Cyber Crime Investigation Unit</option>
                      <option>Cyber Forensics Division</option>
                      <option>Digital Evidence & Analysis Unit</option>
                      <option>State Cyber Cell</option>
                      <option>District Cyber Crime Unit</option>
                      <option>Special Investigation Team (Cyber Crime)</option>
                    </select>
                     {errors.department && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.department}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 order-2">
                <div className="formRow">
                  <div className="formIcon"><FaHashtag/></div>
                  <div className="formContent">
                    <label>PINCODE</label>
                    <input type='number' value={pincode} placeholder='Enter pincode e.g. 400001'  onChange={(e)=>setPincode(e.target.value)} />
                     {errors.pincode && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6 order-1">
                 <div className="formRow">
                  <div className="formIcon"><FaCalendarAlt/></div>
                  <div className="formContent">
                    <label>JOINING DATE</label>
                    <input type='date' value={joiningDate} placeholder='Select Joining Date'  onChange={(e)=>setJoiningDate(e.target.value)} />
                     {errors.joiningDate && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.joiningDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 order-2">
                <div className="formRow">
                  <div className="formIcon"><FaMapMarkedAlt/></div>
                  <div className="formContent">
                    <label>STATE</label>
                    <input type='text' value={state} placeholder='Enter your state '  onChange={(e)=>setState(e.target.value)} />
                     {errors.state && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6 order-1">
                <div className="formRow">
                  <div className="formIcon"><FaCity/></div>
                  <div className="formContent">
                    <label>CITY</label>
                    <input type='text' value={city} placeholder='Enter your city'  onChange={(e)=>setCity(e.target.value)} />
                     {errors.city && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="formRow">
                  <div className="formIcon"><MdLocationOn/></div>
                  <div className="formContent">
                    <label>ADDRESS</label>
                    <textarea type='text' value={address} placeholder='Enter your address'  onChange={(e)=>setAddress(e.target.value)} />
                     {errors.address && (
                      <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                        {errors.address}
                      </p>
                    )}
                  </div>
              </div>

            <button className="updateBtn" onClick={handleUpdateInvestigatorProfileDetails}>Update Profile</button>
          </div>

          <div className="securityNote">
            <BsShieldExclamation style={{fontSize:"40px"}} />
            <p>
              Your personal information is encrypted and stored securely in compliance
              with IT Act 2000 and government data protection guidelines.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InvestigatorProfileCard
