import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const API_URL = "http://localhost:7000/otp/verify";
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleOtpVerificationreq = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Enter valid 6 digit OTP");
      return;
    }

    try {
      const email = localStorage.getItem("email");

      setVerifying(true);
      const res = await axios.post(
        API_URL,
        { email: email, otp },
        { withCredentials: true }
      );
      alert(res.data.message || "OTP verified successfully");

    } catch (error) {
      alert(error.response?.data?.message || "Invalid or expired OTP");

    } finally {
      navigate("/")
      setVerifying(false);
      localStorage.removeItem("email");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {loading ? (
        <div className="loader">
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div className="form-container">
            <div className="form-content">
              <div className="title-section">
                <p className="title">Enter OTP</p>
              </div>

              <form className="form" onSubmit={handleOtpVerificationreq}>
                <div className="input-group">
                  <label htmlFor="otp">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                  />
                </div>

                <button className="sign" type="submit" disabled={verifying}>
                  {verifying ? "Verifying..." : "Verify OTP"}
                </button>
              </form>

              <p className="signup">
                Didn’t receive OTP?
                <a href="" onClick={()=> navigate("/signin")}> Resend</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtpVerification;
