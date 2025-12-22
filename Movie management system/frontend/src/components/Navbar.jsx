import React, { useState } from "react";
import Logo from "../assets/logo.png";
import "../style/navbar.css";
import Btn from "./Btn";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {

  const [open, setOpen] = useState(false);

  const data = [
    { id: 1, path: "/", text: "Home" },
    { id: 3, path: "/dashboard", text: "Dashboard" },
    { id: 2, path: "/movies", text: "Movies" },
    {id : 4 , path: "/addMovie" , text:"Add Movie"}
  ];

  return (
    <>
      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} menu={data} />

      <div className="navContainer">
        <div className="navbarContent d-flex justify-content-between align-items-center ps-4 pe-4 p-2">

          {/* LOGO */}
          <div className="logo d-flex align-items-center">
            <img src={Logo} alt="logo" height={"55px"} />
            &nbsp;&nbsp;
            <span className="text-light fs-4">CineCloud</span>
          </div>

          {/* TOGGLER FOR MOBILE */}
          <div className={`toggler d-md-none ${open ? "d-none" : "d-flex"}`} onClick={() => setOpen(true)}>
            <span className="toggler-line"></span>
            <span className="toggler-line"></span>
            <span className="toggler-line"></span>
          </div>

          {/* DESKTOP MENU */}
          <section className="d-none d-md-flex">
            <div className="menuList text-light">
              <ul className="d-flex gap-4 pt-3 me-4">
                {data.map((el) => (
                  <li key={el.id}>
                    <NavLink to={el.path} className="text-light">
                      {el.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="loginBtn">
              <NavLink to="/profile">
                <Btn />
              </NavLink>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default Navbar;
