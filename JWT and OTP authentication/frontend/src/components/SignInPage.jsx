import axios from "axios";
import React, { use, useState } from "react";
import { data, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const API_URL = "http://localhost:7000/signin";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSending, setOtpSending] = useState(false);

  const handleSignInReq = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      };
      setOtpSending(true);
      const res = await axios.post(API_URL, userData);
      setEmail(""), setPassword("");
      alert(res.data.message);

      if (res.data.status === true) {
        localStorage.setItem("email", email);
        navigate("/otp/verification");
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setOtpSending(false);
    }
  };

  return (
    <>
      {otpSending ? (
        <div className="loaderContainer">
          <div className="terminal-loader">
            <div className="terminal-header">
              <div className="terminal-title">Status</div>
              <div className="terminal-controls">
                <div className="control close"></div>
                <div className="control minimize"></div>
                <div className="control maximize"></div>
              </div>
            </div>
            <div className="text">OTP Sending To Email...</div>
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div class="form-container">
            <div class="form-content">
              <div class="title-section">
                <svg
                  class="title-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                <p class="title">Sign In</p>
              </div>
              <form class="form" onSubmit={handleSignInReq}>
                <div class="input-group">
                  <div class="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path d="M3 5.5h18a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2v-9a2 2 0 012-2z"></path>
                      <path d="M3 5.5l9 7 9-7"></path>
                    </svg>
                  </div>
                  <div class="input-content">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Enter your Email"
                    />
                  </div>
                </div>
                <div class="input-group">
                  <div class="input-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0110 0v4"></path>
                    </svg>
                  </div>
                  <div class="input-content">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      id="password"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <button class="sign" type="submit">
                  <span>Sign in</span>
                  <span class="sign-arrow">→</span>
                </button>
              </form>
              <p class="signup">
                Don't have an account ?
                <a href="" onClick={() => navigate("/signup")}>
                  {" "}
                  SignUp
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInPage;
