import React, { useEffect, useState } from 'react'
import "../style/navbar.css"
import { FaRegUser } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

const Navbar = ({PageName}) => {

  const [time , setTime] = useState( new Date().toLocaleTimeString());
  
   useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
    }, []);

  return (
    <div className='mainSection'>
        <div className="navbarContainer d-flex align-items-center">
          <section className='ps-3 '>
                <p className='m-0' style={{color : "lightCyan"}}><span className='pe-2' style={{color : "grey"}}>e-Cyber Crime Portal <MdKeyboardArrowRight /></span>{PageName}</p>
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
                              <h6 className='m-0' style={{color : "lightCyan"}}>Bhupendra patil </h6>
                              <span className='' style={{color : "lightGray" , fontSize:"12px"}}>+1 04582 96847</span>
                            </div>
                      </div>
            </section>
        </div>
    </div>
  )
}

export default Navbar
