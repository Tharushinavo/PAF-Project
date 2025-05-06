import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { CalendarDays, Sun, CloudMoon, CloudSun, Pizza, Soup, Leaf } from "lucide-react";

const weekdays = [
  { name: "Monday", icon: <CalendarDays size={32} />, color: "#FFD580" },  { name: "Tuesday", icon: <Sun size={32} />, color: "#FF9800" }, // Orange for Tuesday (spicy)
  { name: "Wednesday", icon: <CloudSun size={32} />, color: "#4CAF50" }, // Green for Wednesday (healthy)
  { name: "Thursday", icon: <CloudMoon size={32} />, color: "#8BC34A" }, // Light green for Thursday (calm)
  { name: "Friday", icon: <Pizza size={32} />, color: "#FF5722" }, // Red-orange for Friday (pizza day)
  { name: "Saturday", icon: <Soup size={32} />, color: "#009688" }, // Teal for Saturday (relaxing)
  { name: "Sunday", icon: <Leaf size={32} />, color: "#4CAF50" }, // Green for Sunday (fresh and rejuvenating)
];

const WeekdayCards = () => {
  const navigate = useNavigate();
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <div style={containerStyle}>
      <Navbar />
      <h1 style={headingStyle}>Weekly Meal Planner</h1>
      <div style={cardContainerStyle}>
        {weekdays.map(({ name, icon, color }) => (
          <div
            key={name}
            style={{
              ...cardStyle,
              transform: hoveredDay === name ? "scale(1.05)" : "scale(1)",
              backgroundColor: hoveredDay === name ? `${color}` : `${color}`,
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
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f4f4f4",
  padding: "20px",
  paddingLeft: "240px", // for sidebar space
};

const headingStyle = {
  fontSize: "40px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "20px",
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
  transition: "transform 0.2s, background-color 0.2s",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const cardTitleStyle = {
  margin: 0,
  fontSize: "24px",
};

export default WeekdayCards;
