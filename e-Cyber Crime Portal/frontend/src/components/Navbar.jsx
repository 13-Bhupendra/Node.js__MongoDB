import React, { useEffect, useState } from 'react'
import "../style/navbar.css"
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import axios from 'axios';

const Navbar = ({PageName}) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const [time , setTime] = useState( new Date().toLocaleTimeString());
  const [user , setUser] = useState({
    name : "Guest",
    email : "www.guest999@gmail.com"
  })

  const fetchUser = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/api/me` , {withCredentials : true})

        if(res.data.status){
          setUser({
            name : res.data.user.name ,
            email : res.data.user.email
          })
        }

    } catch (error) {
      console.log(error);
    }
  }

  


   useEffect(() => {
      fetchUser()

      const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
    }, []);

  return (
    <div className='mainSection'>
        <div className="navbarContainer d-flex align-items-center p-0">
          <section className='ps-3 d-flex align-items-center'>
            <div className="toggle me-2 me-sm-4 d-flex d-lg-none justify-content-center align-items-center"   onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}>
               {<CiCircleList  className='fs-4'/>}
            </div>
          
             <p className='m-0 d-none d-sm-flex' style={{color : "lightCyan"}}><span className='pe-2' style={{color : "grey"}}>e-Cyber Crime Portal <MdKeyboardArrowRight /></span>{PageName}</p>
             <p className='m-0 d-flex d-sm-none' style={{color : "lightCyan"}}><span className='pe-2' style={{color : "grey"}}></span>{PageName}</p>
          </section>
            <section className='d-flex'>
                   <div className="timeAndDate me-3 pe-3 d-flex align-items-center">
                      <span style={{color : "lightCyan"}}>{time}</span>
                  </div>
                  <div className="navProfile d-flex pe-3">
                            <div className="profileLogo d-flex justify-content-center align-items-center">
                                  <FaRegUser />
                            </div>
                            <div className='profileLogoText ps-3'>
                              <h6 className='m-0' style={{color : "lightCyan"}}>{user.name} </h6>
                              <span className='' style={{color : "lightGray" , fontSize:"12px"}}>{user.email}</span>
                            </div>
                      </div>
            </section>
        </div>
    </div>
  )
}

export default Navbar
