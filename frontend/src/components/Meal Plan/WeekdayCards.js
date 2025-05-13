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
import { motion } from "framer-motion";

const FOOD_BG =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80";

const weekdays = [
  { name: "Monday", icon: <CalendarDays size={32} />, color: "#FFD580", accent: "#FFA726" },
  { name: "Tuesday", icon: <Sun size={32} />, color: "#FF9800", accent: "#FB8C00" },
  { name: "Wednesday", icon: <CloudSun size={32} />, color: "#4CAF50", accent: "#388E3C" },
  { name: "Thursday", icon: <CloudMoon size={32} />, color: "#8BC34A", accent: "#689F38" },
  { name: "Friday", icon: <Pizza size={32} />, color: "#FF5722", accent: "#E64A19" },
  { name: "Saturday", icon: <Soup size={32} />, color: "#009688", accent: "#00796B" },
  { name: "Sunday", icon: <Leaf size={32} />, color: "#4CAF50", accent: "#2E7D32" },
];

const WeekdayCards = () => {
  const navigate = useNavigate();
  const [hoveredDay, setHoveredDay] = useState(null);
  const [activeDay, setActiveDay] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />
      <div style={contentWrapperStyle}>
        <Navbar />
        <motion.h1 
          style={headingStyle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Weekly Meal Planner
        </motion.h1>
        <p style={subtitleStyle}>Click on a day to plan your meals</p>
        
        <motion.div 
          style={cardContainerStyle}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {weekdays.map(({ name, icon, color, accent }) => (
            <motion.div
              key={name}
              style={{
                ...cardStyle,
                backgroundColor: color,
                background: `linear-gradient(135deg, ${color} 0%, ${accent} 100%)`,
              }}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={() => setHoveredDay(name)}
              onMouseLeave={() => setHoveredDay(null)}
              onClick={() => {
                setActiveDay(name);
                setTimeout(() => navigate(`/meal-planner/${name.toLowerCase()}`), 200);
              }}
              animate={activeDay === name ? { scale: 0.9 } : {}}
            >
              <div style={iconStyle}>{icon}</div>
              <h2 style={cardTitleStyle}>{name}</h2>
              {hoveredDay === name && (
                <motion.div 
                  style={hoverIndicatorStyle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <div style={footerStyle}>
          <p>Plan your meals for the week ahead</p>
          <p style={{ fontSize: "12px", opacity: 0.7 }}>Tap any day to get started</p>
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
  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${FOOD_BG}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  padding: "20px",
  paddingLeft: "240px",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)",
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
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#fff",
  marginBottom: "10px",
  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
};

const subtitleStyle = {
  fontSize: "1rem",
  color: "rgba(255,255,255,0.9)",
  marginBottom: "40px",
  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
};

const cardContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "25px",
  width: "90%",
  maxWidth: "900px",
  marginBottom: "40px",
};

const cardStyle = {
  padding: "30px 20px",
  color: "white",
  borderRadius: "20px",
  textAlign: "center",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  userSelect: "none",
  boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
};

const iconStyle = {
  marginBottom: "15px",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
};

const cardTitleStyle = {
  margin: 0,
  fontSize: "1.5rem",
  fontWeight: "600",
  textShadow: "0 1px 3px rgba(0,0,0,0.3)",
};

const hoverIndicatorStyle = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "30px",
  height: "4px",
  backgroundColor: "white",
  borderRadius: "2px",
};

const footerStyle = {
  marginTop: "auto",
  color: "rgba(255,255,255,0.8)",
  textAlign: "center",
  fontSize: "0.9rem",
  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
};

export default WeekdayCards;