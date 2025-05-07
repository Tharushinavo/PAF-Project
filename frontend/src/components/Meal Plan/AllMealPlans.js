import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { jsPDF } from "jspdf";
import MealPlanService from '../../services/MealPlanService';

//
const MEAL_BG = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=1200&q=80";

const AllMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    breakfast: "",
    snacks:"",
    lunch: "",
    dinner: "",
    dayOfWeek: ""
  });

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await MealPlanService.getAllMealPlans();
        setMealPlans(response);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };
    fetchMealPlans();
  }, []);

  const deleteMealPlan = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal plan?")) {
      try {
        await MealPlanService.deleteMealPlan(id);
        setMealPlans((prev) => prev.filter((plan) => plan.id !== id));
        alert("Meal plan deleted successfully!");
      } catch (error) {
        console.error("Error deleting meal plan:", error.message);
        alert("Failed to delete meal plan.");
      }
    }
  };

  const startEditing = (plan) => {
    setEditingId(plan.id);
    setEditFormData({
      breakfast: plan.breakfast || "",
      snacks: plan.snacks || "",
      lunch: plan.lunch || "",
      dinner: plan.dinner || "",
      dayOfWeek: plan.dayOfWeek 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const saveMealPlan = async (id) => {
    try {
      const response = await MealPlanService.updateMealPlan(id, editFormData);
      setMealPlans((prev) =>
        prev.map((plan) => (plan.id === id ? response : plan))
      );
      alert("Meal plan updated successfully!");
      setEditingId(null);
    } catch (error) {
      console.error("Error updating meal plan:", error.message);
      alert("Failed to update meal plan.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("All Meal Plans", 10, 10);

    let yPosition = 20;
    mealPlans.forEach((plan) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(14);
      doc.text(`${plan.dayOfWeek}`, 10, yPosition);
      doc.setFontSize(12);
      yPosition += 10;

      doc.text(`Breakfast: ${plan.breakfast || "Not specified"}`, 10, yPosition);
      yPosition += 10;

      doc.text(`Snacks: ${plan.snacks || "Not specified"}`, 10, yPosition);
      yPosition += 10;

      doc.text(`Lunch: ${plan.lunch || "Not specified"}`, 10, yPosition);
      yPosition += 10;

      doc.text(`Dinner: ${plan.dinner || "Not specified"}`, 10, yPosition);
      yPosition += 20;
    });

    doc.save("MealPlans.pdf");
  };

  return (
    <div style={{ ...pageContainer, backgroundImage: `url('${MEAL_BG}')` }}>
      <div style={overlayStyle} />
      <Navbar />
      <div style={contentContainer}>
        <h1 style={headingStyle}>All Meal Plans</h1>
        <button onClick={generatePDF} style={pdfButtonStyle}>
          📄 Download PDF
        </button>
        <div style={gridStyle}>
          {mealPlans.map((plan) => (
            <div key={plan.id} style={cardStyle}>
              <h2>{plan.dayOfWeek}</h2>
              {editingId === plan.id ? (
                <>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Breakfast:</label>
                    <input
                      type="text"
                      name="breakfast"
                      value={editFormData.breakfast}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Snacks:</label>
                    <input
                      type="text"
                      name="snacks"
                      value={editFormData.snacks}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Lunch:</label>
                    <input
                      type="text"
                      name="lunch"
                      value={editFormData.lunch}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Dinner:</label>
                    <input
                      type="text"
                      name="dinner"
                      value={editFormData.dinner}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={buttonGroupStyle}>
                    <button onClick={() => saveMealPlan(plan.id)} style={saveButtonStyle}>Save</button>
                    <button onClick={() => setEditingId(null)} style={cancelButtonStyle}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={mealItemStyle}><strong>Breakfast:</strong> {plan.breakfast || "Not specified"}</div>
                  <div style={mealItemStyle}><strong>Snacks:</strong> {plan.snacks || "Not specified"}</div>
                  <div style={mealItemStyle}><strong>Lunch:</strong> {plan.lunch || "Not specified"}</div>
                  <div style={mealItemStyle}><strong>Dinner:</strong> {plan.dinner || "Not specified"}</div>
                  <div style={buttonGroupStyle}>
                    <button onClick={() => startEditing(plan)} style={editButtonStyle}>Edit</button>
                    <button onClick={() => deleteMealPlan(plan.id)} style={deleteButtonStyle}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const pageContainer = {
  display: "flex",
  minHeight: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100vw",
  position: "relative"
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 0
};

const contentContainer = {
  marginLeft: "220px",
  padding: "20px",
  flexGrow: 1,
  position: "relative",
  zIndex: 1
};

const headingStyle = {
  fontSize: "2rem",
  color: "#fff", // White color for strong contrast
  marginBottom: "20px",
  textShadow: "0 2px 8px rgba(0,0,0,0.4)" // Subtle shadow for readability
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  marginTop: "20px"
};

const cardStyle = {
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  position: "relative",
  zIndex: 1
};

const mealItemStyle = {
  margin: "10px 0",
  padding: "5px 0"
};

const formGroupStyle = {
  marginBottom: "15px"
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "500"
};

const inputStyle = {
  padding: "8px",
  width: "100%",
  fontSize: "1rem",
  borderRadius: "5px",
  border: "1px solid #ddd"
};

const buttonGroupStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "15px"
};

const editButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "5px",
  cursor: "pointer"
};

const deleteButtonStyle = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "5px",
  cursor: "pointer"
};

const saveButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "5px",
  cursor: "pointer"
};

const cancelButtonStyle = {
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "5px",
  cursor: "pointer"
};

const pdfButtonStyle = {
  backgroundColor: "#686dc2",
  color: "white",
  border: "none",
  padding: "10px 20px",
  fontSize: "1rem",
  fontWeight: "500",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "20px",
  transition: "background-color 0.3s ease"
};

export default AllMealPlans;
