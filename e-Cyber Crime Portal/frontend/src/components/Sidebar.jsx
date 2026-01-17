import React, { useEffect, useState } from 'react'
import "../style/sidebar.css"
import { FiShield } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import LOGO from "../assets/images/logo.png"


const Sidebar = () => {

  const menuListData = [
    {id : 1 , path:"/" , text : "Home" , icon : <IoHomeOutline /> },
    {id : 2  , path:"/about" ,  text : "About" , icon : <AiOutlineExclamationCircle /> },
    {id : 3  , path:"/contact" ,  text : "Contact" , icon : <BsTelephone /> },
  ]

  const menuListDataTwo = [
    {id : 1 , path : "/auth/signin" , text : "Sign in" , icon : <IoIosLogIn />},
    {id : 2 , path : "/auth/signup" , text : "Register" , icon : <FaRegUser />},
  ]

   const [isOpen, setIsOpen] = useState(window.innerWidth >= 992)

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(prev => !prev)
    }

    window.addEventListener("toggle-sidebar", handleToggle)

    return () => {
      window.removeEventListener("toggle-sidebar", handleToggle)
    }
  }, [])

  return (
    <div className='SideBarMainContainer pt-3 ' style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}>
      <div className="sideBarHeader d-flex justify-content-between mb-3 ps-4 pb-3 ">
         <section className='d-flex'>
           <div className="logo d-flex justify-content-center align-items-center">
            <img src={LOGO} alt="" height={"35px"}/>
            {/* {<FiShield /> } */}
          </div>
          <div className='logoText ps-3'>
            <h6 className='m-0' style={{color : "lightCyan"}}>e-Cyber Crime</h6>
            <span className='' style={{color : "lightGray" , fontSize:"12px"}}>PORTAL</span>
          </div>
         </section>

         <section>
            <div className="toggle me-4 d-flex d-lg-none justify-content-center align-items-center" onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}>
               {<IoClose  className='fs-4'/>}
            </div>
         </section>
      </div>
    

      <div className="sidebarMenuList ps-4 pe-4">
          <p className='menuTitle' >Main Menu</p>
          {menuListData.map((el)=>(
            <NavLink to={el.path} className={({isActive})=>isActive ? "navMenu active" : "navMenu"}   onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}>
              <section>
                {el.icon}<span className='ps-2'> {el.text}</span>
              </section>
            </NavLink>
          ))}
          
          <p className='menuTitle mt-5' >Access Portal</p>
          {menuListDataTwo.map((el)=>(
            <NavLink to={el.path} className={({isActive})=>isActive ? "navMenu active" : "navMenu"} onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}>
              <section>
                {el.icon}<span className='ps-2'> {el.text}</span>
              </section>
            </NavLink>
          ))}
      </div>
  
      <div className="sidebarFooter pt-3">
          <p>~ Trusted Cyber Crime System</p>
      </div>
    </div>
  )
}

export default Sidebar
