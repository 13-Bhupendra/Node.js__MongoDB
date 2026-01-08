import React, { useState } from "react";
import axios from "axios"
import {useNavigate } from "react-router-dom"

const SignUpPage = () => {
  const API_URL = "http://localhost:7000/signup"
  const navigate = useNavigate();

  const [name , setName] = useState("")
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("")

  const handleSignUpReq = async (e)=>{
    e.preventDefault();

      try {
        const UserData = {
          name,
          email ,
          password , 
        }
        const res = await axios.post(API_URL , UserData) ;
       
        if(res.data.status === true){
          navigate("/signin")
        }
        
        alert("Registration successfull !")
        setEmail("") , setName("") , setPassword("")
      } catch (error) {
        console.log(error)
      }
  }

  return (
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
              <p class="title">Registration form</p>
            </div>
            <form class="form" onSubmit={handleSignUpReq}>
              <div class="input-group">
                <div class="input-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="input-content">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    id="username"
                    placeholder="Enter your username"
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
                    onChange={(e)=>setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button class="sign" type="submit">
                <span>Sign up</span>
                <span class="sign-arrow">→</span>
              </button>
            </form>
            <p class="signup">
              Already have a account ?<a href="" onClick={()=>navigate("/signin")}> Sign in</a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default SignUpPage;
