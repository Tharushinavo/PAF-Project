import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { jsPDF } from "jspdf";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFileDownload, 
  faEdit, 
  faTrash, 
  faSave, 
  faTimes, 
  faCoffee, 
  faUtensils, 
  faDrumstickBite, 
  faAppleAlt
} from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:8080/api/mealplan";

const AllMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: ""
  });

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get(`${API_URL}/all`);
        setMealPlans(response.data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
        alert("Failed to load meal plans");
      }
    };
    fetchMealPlans();
  }, []);

  const handleEditClick = (mealPlan) => {
    setEditingId(mealPlan.id);
    setEditFormData({
      breakfast: mealPlan.breakfast,
      lunch: mealPlan.lunch,
      dinner: mealPlan.dinner,
      snacks: mealPlan.snacks
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditFormSubmit = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, {
        ...editFormData,
        dayOfWeek: mealPlans.find(plan => plan.id === id).dayOfWeek
      });
      setMealPlans(mealPlans.map(plan => 
        plan.id === id ? { ...plan, ...response.data } : plan
      ));
      setEditingId(null);
      alert("Meal plan updated successfully!");
    } catch (error) {
      console.error("Error updating meal plan:", error);
      alert("Failed to update meal plan");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal plan?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        setMealPlans(mealPlans.filter(plan => plan.id !== id));
        alert("Meal plan deleted successfully!");
      } catch (error) {
        console.error("Error deleting meal plan:", error);
        alert("Failed to delete meal plan");
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Weekly Meal Plans", 10, 10);

    let yPosition = 20;
    mealPlans.forEach((plan) => {
      doc.setFontSize(12);
      doc.text(`${plan.dayOfWeek}:`, 10, yPosition);
      yPosition += 7;
      doc.text(`Breakfast: ${plan.breakfast || "Not specified"}`, 15, yPosition);
      yPosition += 7;
      doc.text(`Lunch: ${plan.lunch || "Not specified"}`, 15, yPosition);
      yPosition += 7;
      doc.text(`Dinner: ${plan.dinner || "Not specified"}`, 15, yPosition);
      yPosition += 7;
      doc.text(`Snacks: ${plan.snacks || "Not specified"}`, 15, yPosition);
      yPosition += 15;
    });

    doc.save("weekly_meal_plans.pdf");
  };

  // Helper function to get meal icon based on meal type
  const getMealIcon = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return faCoffee;
      case "lunch":
        return faUtensils;
      case "dinner":
        return faDrumstickBite;
      case "snacks":
        return faAppleAlt;
      default:
        return faUtensils;
    }
  };

  return (
    <div style={backgroundWrapper}>
      <Navbar />
      <div style={contentContainerStyle}>
        <div style={headerContainerStyle}>
          <h1 style={headingStyle}>Weekly Meal Plans</h1>
          <button onClick={generatePDF} style={pdfButtonStyle}>
            <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: "8px" }} />
            Download PDF
          </button>
        </div>

        <div style={gridStyle}>
          {mealPlans.map((plan) => (
            <div key={plan.id} style={cardStyle}>
              <div style={cardHeaderStyle}>
                <h3 style={dayHeaderStyle}>{plan.dayOfWeek}</h3>
              </div>

              {editingId === plan.id ? (
                <div style={editFormStyle}>
                  {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
                    <div key={meal} style={formGroupStyle}>
                      <label style={formLabelStyle}>
                        <FontAwesomeIcon icon={getMealIcon(meal)} style={{ marginRight: "8px" }} />
                        {meal.charAt(0).toUpperCase() + meal.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={meal}
                        value={editFormData[meal]}
                        onChange={handleEditFormChange}
                        style={inputStyle}
                        placeholder={`Enter ${meal} items...`}
                      />
                    </div>
                  ))}
                  <div style={buttonGroupStyle}>
                    <button
                      style={saveButtonStyle}
                      onClick={() => handleEditFormSubmit(plan.id)}
                    >
                      <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                      Save
                    </button>
                    <button style={cancelButtonStyle} onClick={handleCancelClick}>
                      <FontAwesomeIcon icon={faTimes} style={{ marginRight: "5px" }} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={mealContentStyle}>
                  {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
                    <div key={meal} style={mealItemContainerStyle}>
                      <div style={mealTitleStyle}>
                        <FontAwesomeIcon icon={getMealIcon(meal)} style={{ marginRight: "10px", color: "#1e7852" }} />
                        <strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong>
                      </div>
                      <div style={mealTextStyle}>
                        {plan[meal] || "Not specified"}
                      </div>
                    </div>
                  ))}
                  <div style={buttonGroupStyle}>
                    <button style={editButtonStyle} onClick={() => handleEditClick(plan)}>
                      <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                      Edit
                    </button>
                    <button style={deleteButtonStyle} onClick={() => handleDelete(plan.id)}>
                      <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Background styles
const backgroundWrapper = {
  position: "relative",
  minHeight: "100vh",
  backgroundImage: 'url("https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1950&q=80")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  display: "flex",
};

const contentContainerStyle = {
  marginLeft: "220px",
  padding: "30px",
  width: "100%",
  position: "relative",
  zIndex: 1,
};

const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const headingStyle = {
  fontSize: "2.5rem",
  color: "#ffffff",
  fontFamily: "'Playfair Display', serif",
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  margin: 0,
  fontWeight: "bold",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "25px",
};

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
  }
};

const cardHeaderStyle = {
  backgroundColor: "rgba(30, 120, 82, 0.15)",
  borderBottom: "1px solid rgba(30, 120, 82, 0.2)",
  padding: "15px 20px",
};

const dayHeaderStyle = {
  margin: 0,
  color: "#1e7852",
  fontSize: "1.4rem",
  fontWeight: "600",
};

const mealContentStyle = {
  padding: "20px",
};

const mealItemContainerStyle = {
  marginBottom: "15px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  paddingBottom: "12px",
};

const mealTitleStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
  fontWeight: "600",
  color: "#1e7852",
  marginBottom: "5px",
};

const mealTextStyle = {
  paddingLeft: "30px",
  fontSize: "14px",
  color: "#34495e",
  lineHeight: "1.5",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "20px",
  justifyContent: "flex-end",
};

const editButtonStyle = {
  padding: "9px 16px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.2s ease",
  ":hover": {
    backgroundColor: "#2980b9",
  }
};

const deleteButtonStyle = {
  padding: "9px 16px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.2s ease",
  ":hover": {
    backgroundColor: "#c0392b",
  }
};

const pdfButtonStyle = {
  padding: "12px 22px",
  backgroundColor: "#27ae60",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: "#219653",
    transform: "translateY(-2px)",
  }
};

const editFormStyle = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const formLabelStyle = {
  display: "flex",
  alignItems: "center",
  fontWeight: "500",
  color: "#1e7852",
};

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e0",
  fontSize: "14px",
  transition: "border-color 0.2s ease",
  ":focus": {
    borderColor: "#3498db",
    outline: "none",
  }
};

const saveButtonStyle = {
  ...editButtonStyle,
  backgroundColor: "#2ecc71",
  ":hover": {
    backgroundColor: "#27ae60",
  }
};

const cancelButtonStyle = {
  ...editButtonStyle,
  backgroundColor: "#95a5a6",
  ":hover": {
    backgroundColor: "#7f8c8d",
  }
};

export default AllMealPlans;