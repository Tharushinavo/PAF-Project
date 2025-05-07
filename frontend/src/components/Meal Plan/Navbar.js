import React from "react";
import { Link } from "react-router-dom";
import { FaUtensils, FaListAlt, FaUserCircle } from "react-icons/fa"; 
const Navbar = () => {
  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/meal-planner" style={navLinkStyle}>
            <div style={navBoxStyle}>
              <FaUtensils style={iconStyle} />
              <span>Meal Planner</span>
            </div>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/all-meal-plans" style={navLinkStyle}>
            <div style={navBoxStyle}>
              <FaListAlt style={iconStyle} />
              <span>All Meal Plans</span>
            </div>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/userProfile" style={navLinkStyle}>
            <div style={navBoxStyle}>
              <FaUserCircle style={iconStyle} />
              <span>Back to Profile</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};


const navStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  height: "100vh",
  width: "240px",
  background: "#333",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const navListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const navItemStyle = {
  marginBottom: "20px",
  width: "100%",
  textAlign: "center",
};

const navLinkStyle = {
  textDecoration: "none",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const navBoxStyle = {
  background: "#444",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px",
  borderRadius: "10px",
  width: "80%",
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const iconStyle = {
  fontSize: "20px",
};

export default Navbar;
