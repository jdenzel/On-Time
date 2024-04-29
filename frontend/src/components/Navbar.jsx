import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
        <button className="nav-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
