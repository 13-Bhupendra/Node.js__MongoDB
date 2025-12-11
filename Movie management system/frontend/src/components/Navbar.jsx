import React from "react";
import Logo from "../assets/logo.png";
import "../style/navbar.css";
import Btn from "./Btn";
import { data, NavLink } from "react-router-dom";

const Navbar = () => {
  
  const data = [
    { id: 1, path: "/", text: "Home" },
    { id: 1, path: "/movies", text: "Movies" },
    { id: 1, path: "/dashboard", text: "Dashboard" },
  ];

  return (
    <div className="containder">
      <div className="navbarContent d-flex justify-content-between d-flex justify-content-between align-items-center  p-2">
        <div className="logo">
          <img src={Logo} alt="logo not Found !" height={"55px"} /> &nbsp;&nbsp;
          <span className="text-light fs-4">CineCloud</span>
        </div>

        <section className="d-flex">
          <div className="menuList text-light ">
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
          <div className="loginBtn ">
            <NavLink to="/profile" ><Btn /></NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
