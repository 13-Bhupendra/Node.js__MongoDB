import axios from "axios";
import React, { useEffect, useState } from "react";

const OtpVerification = () => {
  const API_URL = "http://localhost:7000/otp/verify";

  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOtpVerificationreq = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Enter valid 6 digit OTP");
      return;
    }

    try {
      setVerifying(true);
      const res = await axios.post(
        API_URL,
        { otp },
        { withCredentials: true }
      );
      alert(res.data.message || "OTP verified successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="main-container">
          <div className="loader">
            <center>
              <p className="title">OTP Sent on Email</p>
            </center>

            <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="chipGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2d2d2d" />
                  <stop offset="100%" stopColor="#0f0f0f" />
                </linearGradient>

                <linearGradient id="textGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eeeeee" />
                  <stop offset="100%" stopColor="#888888" />
                </linearGradient>

                <linearGradient id="pinGradient" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#bbbbbb" />
                  <stop offset="50%" stopColor="#888888" />
                  <stop offset="100%" stopColor="#555555" />
                </linearGradient>
              </defs>

              <g id="traces">
                <path d="M100 100 H200 V210 H326" className="trace-bg" />
                <path d="M100 100 H200 V210 H326" className="trace-flow purple" />

                <path d="M80 180 H180 V230 H326" className="trace-bg" />
                <path d="M80 180 H180 V230 H326" className="trace-flow blue" />

                <path d="M60 260 H150 V250 H326" className="trace-bg" />
                <path d="M60 260 H150 V250 H326" className="trace-flow yellow" />

                <path d="M100 350 H200 V270 H326" className="trace-bg" />
                <path d="M100 350 H200 V270 H326" className="trace-flow green" />

                <path d="M700 90 H560 V210 H474" className="trace-bg" />
                <path d="M700 90 H560 V210 H474" className="trace-flow blue" />

                <path d="M740 160 H580 V230 H474" className="trace-bg" />
                <path d="M740 160 H580 V230 H474" className="trace-flow green" />

                <path d="M720 250 H590 V250 H474" className="trace-bg" />
                <path d="M720 250 H590 V250 H474" className="trace-flow red" />

                <path d="M680 340 H570 V270 H474" className="trace-bg" />
                <path d="M680 340 H570 V270 H474" className="trace-flow yellow" />
              </g>

              <rect
                x="330"
                y="190"
                width="140"
                height="100"
                rx="20"
                fill="url(#chipGradient)"
                stroke="#222"
                strokeWidth="3"
              />

              <text
                x="400"
                y="240"
                fontSize="22"
                fill="url(#textGradient)"
                textAnchor="middle"
              >
                Loading
              </text>
            </svg>
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
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
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
                <a href="#"> Resend</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtpVerification;
