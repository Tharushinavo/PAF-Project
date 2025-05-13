import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUtensils, FaListAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/userProfile" style={navLinkStyle}>
            <div className="nav-box">
              <FaUserCircle style={iconStyle} />
              Back to Profile
            </div>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/meal-planner" style={navLinkStyle}>
            <div className="nav-box">
              <FaUtensils style={iconStyle} />
              Meal Planner
            </div>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/all-meal-plans" style={navLinkStyle}>
            <div className="nav-box">
              <FaListAlt style={iconStyle} />
              All Meal Plans
            </div>
          </Link>
        </li>
      </ul>

      {/* Injecting global styles for hover effects */}
      <style>{`
        .nav-box {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          padding: 15px;
          border-radius: 12px;
          width: 80%;
          text-align: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }

        .nav-box:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }
      `}</style>
    </nav>
  );
};

// Sidebar nav styling
const navStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  height: "100vh",
  width: "220px",
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "4px 0 10px rgba(0, 0, 0, 0.3)",
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
  gap: "20px", // Gap between nav items
};

const navItemStyle = {
  width: "100%",
  textAlign: "center",
};

const navLinkStyle = {
  textDecoration: "none",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const iconStyle = {
  fontSize: "22px",
  marginRight: "6px",
  verticalAlign: "middle",
};

export default Navbar;
