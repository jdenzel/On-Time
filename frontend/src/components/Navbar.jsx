import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

function NavBar() {
  const navigate = useNavigate();
  const [navClass, setNavClass] = useState("topnav");

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  const loggedIn = !!localStorage.getItem(ACCESS_TOKEN);

  if (!loggedIn) {
    return null;
  }

  const navCollapse = () => {
    if (navClass === "topnav") {
      setNavClass("topnav responsive");
    } else {
      setNavClass("topnav");
    }
  };

  return (
    <div>
      <div className={navClass} id="myTopnav">
        <div className="nav-link-full">
          <NavLink className="nav-link" to="/clockin" activeClassName="active">
            Time Clock
          </NavLink>
          <NavLink
            className="nav-link"
            to="/timesheet"
            activeClassName="active"
          >
            Time Sheet
          </NavLink>
          <button className="nav-btn" onClick={handleLogout}>
          Logout
        </button>
        </div>
        <NavLink
          className="nav-link icon"
          onClick={(e) => {
            e.preventDefault();
            navCollapse();
          }}
        >
          <i className="fa fa-bars"></i>
        </NavLink>
        
      </div>
    </div>
  );
}

export default NavBar;
