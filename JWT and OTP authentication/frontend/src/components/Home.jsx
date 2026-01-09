import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const GET_DATA_URL = "http://localhost:7000/get";
  const LOG_OUT_URL = "http://localhost:7000/signout";
  const navigate = useNavigate()
  
  const [data , setData] = useState([])

  //fetch data 
  const handleFetchedData = async()=>{
    try {
      const res = await axios.get(GET_DATA_URL ,{ withCredentials: true});
      setData(res.data.result);
    } catch (error) {
      console.log(error)
    }
  }

  //handleLogOut 
  const handleSignOut = async ()=>{
    try {
      const res = await axios.get(LOG_OUT_URL , { withCredentials: true,})
      // console.log(res)
    } catch (error) {
      console.log(error)
    }finally
    {
      navigate("/signin")
      alert("Sign out successfully !")
    }
  }

  useEffect(()=> {
    handleFetchedData()
  } , [])
  
  return (
    <div className="home-container">
      <nav className="navbar">
        <h2 className="logo">MyApp</h2>
        <button className="logout-btn" onClick={handleSignOut}>Logout</button>
      </nav>

      <div className="content">
        {data.map((el)=>(
          
        <div className="card">
          <h3>Username</h3>
          <p>{el.name}</p>
          <br />
          <h3>Email</h3>
          <p>{el.email}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
