import React, { useEffect, useState } from "react";
import ProfileImage from "../assets/images/profIcon.png";
import {MdOutlineMailOutline,MdLocationOn,MdOutlineLogout,} from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import {FaUser,FaHashtag,FaCity,FaMapMarkedAlt,} from "react-icons/fa";
import { BsShieldExclamation } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfileCard = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});

  const firstLetter = name.charAt(1).toUpperCase();

  /* ================= Fetch User ================= */
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/userProfile/details`,
        { withCredentials: true }
      );

      if (res.data.status) {
        const u = res.data.user;
        setEmail(u.email);
        setRole(u.role);
        setName(u.name);
        setPhone(u.phone || "");
        setPincode(u.pincode || "");
        setAddress(u.address || "");
        setCity(u.city || "");
        setState(u.state || "");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /* ================= Update Profile ================= */
  const handleUpdateProfileDetails = async () => {
    setErrors({});

    try {
      const res = await axios.put(
        `${BASE_URL}/api/update/userProfile/details`,
        { phone, pincode, address, city, state },
        { withCredentials: true }
      );

      if (res.data.status) {
        alert(res.data.message);
        fetchUser();
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  /* ================= Logout ================= */
  const handleSignout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/signout`,
        {},
        { withCredentials: true }
      );

      if (res.data.status) {
        alert(res.data.message);
        navigate("/auth/signin");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="userProfileCard d-flex justify-content-center">
      <div className="row w-100 justify-content-center p-5">

        {/* LEFT CARD */}
        <div className="col-lg-4 col-md-12">
          <div className="profileMainContentCard">
            <div className="cardheader"></div>

            <div className="d-flex justify-content-center">
              <div className="profileImage d-flex justify-content-center align-items-center">
                    <span className="profileLetter">
                      {firstLetter || "U"}
                    </span>
              </div>
            </div>

            <div className="profileInfo text-center d-flex align-items-center">
              <h4 className="fw-bold" style={{ color: "lightcyan" }}>
                {name}
              </h4>

              <div className="roleIcon">{role}</div>

              <p className="m-0 text-muted small">
                <MdOutlineMailOutline /> {email}
              </p>

              <p className="m-0 mt-1 text-muted small">
                <LuPhone /> {phone || "Not added"}
              </p>

              <div className="logOutBtn">
                <button onClick={handleSignout}>
                  Log out <MdOutlineLogout />
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

        {/* RIGHT CARD */}
        <div className="col-lg-7 col-md-12">
          <div className="profileDetailsCard">

            <div className="personalHeader">
              <h5>Personal Information</h5>
              <p>Your registered details</p>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaUser /></div>
              <div className="formContent">
                <label>FULL NAME</label>
                <input value={name} disabled />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><MdOutlineMailOutline /></div>
              <div className="formContent">
                <label>EMAIL</label>
                <input value={email} disabled />
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><LuPhone /></div>
              <div className="formContent">
                <label>PHONE</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your mobile number"/>
                {errors.phone && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="formRow" style={{ borderBottom: "none" }}>
              <div className="formIcon"><FiEdit2 /></div>
              <div className="formContent passwordField">
                <label>PASSWORD</label>
                <div className="passwordInput">
                  <input type="password" placeholder="* * * * * * * * * * *" disabled />
                </div>
                <p
                  className="fs-6 d-flex justify-content-end m-0"
                  style={{ color: "#1667b2", cursor: "pointer" }}
                  onClick={()=>navigate("/auth/changePassword")}
                >
                  Change Password ?
                </p>
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaHashtag /></div>
              <div className="formContent">
                <label>PINCODE</label>
                <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)}  placeholder="Enter Pincode e.g. 400001"/>
                {errors.pincode && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><MdLocationOn /></div>
              <div className="formContent">
                <label>ADDRESS</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address"/>
                {errors.address && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaCity /></div>
              <div className="formContent">
                <label>CITY</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city"/>
                {errors.city && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            <div className="formRow">
              <div className="formIcon"><FaMapMarkedAlt /></div>
              <div className="formContent">
                <label>STATE</label>
                <input value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter your state"/>
                {errors.state && (
                  <p className="p-0 m-0 mt-1" style={{ color: "red", fontSize: "12px" }}>
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <button className="updateBtn" onClick={handleUpdateProfileDetails}>
              Update Profile
            </button>
          </div>

          <div className="securityNote">
            <BsShieldExclamation style={{ fontSize: "40px" }} />
            <p>
              Your personal information is encrypted and securely stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
