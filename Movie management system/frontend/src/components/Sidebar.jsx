import React from "react";
import { NavLink } from "react-router-dom";
import "../style/navbar.css";

const Sidebar = ({ open, setOpen, menu }) => {
  return (
    <>
      <div className={`sidebar-overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)}></div>

      <div className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <span className="close-btn" onClick={() => setOpen(false)}>✕</span>
        </div>

        <ul className="sidebar-menu">
          {menu.map((el) => (
            <li key={el.id} onClick={() => setOpen(false)}>
              <NavLink to={el.path}>{el.text}</NavLink>
            </li>
          ))}
        </ul>

        <NavLink to="/profile" onClick={() => setOpen(false)}>
            <div className='btn' style={{width:"90%"}}>
                    <button>Login</button>
             </div>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
