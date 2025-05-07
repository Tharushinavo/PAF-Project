import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  CalendarDays,
  Sun,
  CloudMoon,
  CloudSun,
  Pizza,
  Soup,
  Leaf,
} from "lucide-react";


const FOOD_BG =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80";

const weekdays = [
  { name: "Monday", icon: <CalendarDays size={32} />, color: "#FFD580" },
  { name: "Tuesday", icon: <Sun size={32} />, color: "#FF9800" },
  { name: "Wednesday", icon: <CloudSun size={32} />, color: "#4CAF50" },
  { name: "Thursday", icon: <CloudMoon size={32} />, color: "#8BC34A" },
  { name: "Friday", icon: <Pizza size={32} />, color: "#FF5722" },
  { name: "Saturday", icon: <Soup size={32} />, color: "#009688" },
  { name: "Sunday", icon: <Leaf size={32} />, color: "#4CAF50" },
];

const WeekdayCards = () => {
  const navigate = useNavigate();
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <div style={containerStyle}>
      {/* Overlay for readability */}
      <div style={overlayStyle} />
      <div style={contentWrapperStyle}>
        <Navbar />
        <h1 style={headingStyle}>Weekly Meal Planner</h1>
        <div style={cardContainerStyle}>
          {weekdays.map(({ name, icon, color }) => (
            <div
              key={name}
              style={{
                ...cardStyle,
                transform: hoveredDay === name ? "scale(1.05)" : "scale(1)",
                backgroundColor: color,
                boxShadow:
                  hoveredDay === name
                    ? "0 8px 16px rgba(0,0,0,0.2)"
                    : "0 4px 8px rgba(0,0,0,0.1)",
              }}
              onClick={() => navigate(`/meal-planner/${name.toLowerCase()}`)}
              onMouseEnter={() => setHoveredDay(name)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <div style={{ marginBottom: "10px" }}>{icon}</div>
              <h2 style={cardTitleStyle}>{name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const containerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundImage: `url('${FOOD_BG}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "20px",
  paddingLeft: "240px", // For sidebar space
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.35)", // Slightly dark overlay for readability
  zIndex: 0,
};

const contentWrapperStyle = {
  position: "relative",
  zIndex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headingStyle = {
  fontSize: "40px",
  fontWeight: "bold",
  color: "#fff",
  marginBottom: "20px",
  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
};

const cardContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  width: "80%",
  maxWidth: "700px",
};

const cardStyle = {
  padding: "30px",
  color: "white",
  borderRadius: "15px",
  textAlign: "center",
  fontSize: "30px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  userSelect: "none",
};

const cardTitleStyle = {
  margin: 0,
  fontSize: "24px",
};

export default WeekdayCards;
