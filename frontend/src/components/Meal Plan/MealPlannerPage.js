import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import MealPlanService from '../services/MealPlanService';

const MealPlannerPage = () => {
  const { day } = useParams();
  const [mealPlan, setMealPlan] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    dayOfWeek: ""
  });

  //
  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await MealPlanService.getMealPlanByDay(day);
        setMealPlan(response);
        setFormData({
          breakfast: response.breakfast || "",
          lunch: response.lunch || "",
          dinner: response.dinner || "",
          dayOfWeek: response.dayOfWeek || day.toUpperCase()
        });
      } catch (error) {
        // If 404, create a new empty form with just the day
        if (error.response && error.response.status === 404) {
          setMealPlan(null);
          setFormData({
            breakfast: "",
            lunch: "", 
            dinner: "",
            dayOfWeek: day.toUpperCase()
          });
        } else {
          console.error("Error fetching meal plan:", error);
        }
      }
    };

    if (day) fetchMealPlan();
  }, [day]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (mealPlan && mealPlan.id) {
        // Update existing meal plan
        const response = await MealPlanService.updateMealPlan(mealPlan.id, formData);
        setMealPlan(response);
      } else {
        // Create new meal plan
        const response = await MealPlanService.createMealPlan(formData);
        setMealPlan(response.data);
      }
      setEditMode(false);
      alert("Meal plan saved successfully!");
    } catch (error) {
      console.error("Error saving meal plan:", error);
      alert("Failed to save meal plan. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!mealPlan || !mealPlan.id) return;
    
    if (window.confirm("Are you sure you want to delete this meal plan?")) {
      try {
        await MealPlanService.deleteMealPlan(mealPlan.id);
        setMealPlan(null);
        setFormData({
          breakfast: "",
          lunch: "",
          dinner: "",
          dayOfWeek: day.toUpperCase()
        });
        alert("Meal plan deleted successfully!");
      } catch (error) {
        console.error("Error deleting meal plan:", error);
        alert("Failed to delete meal plan.");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={contentContainerStyle}>
        <h1 style={headingStyle}>Meal Plan for {day.charAt(0).toUpperCase() + day.slice(1)}</h1>

        {!editMode && mealPlan ? (
          <div style={mealDisplayStyle}>
            <div style={mealCardStyle}>
              <h3>Breakfast</h3>
              <p>{mealPlan.breakfast || "Not specified"}</p>
            </div>
            <div style={mealCardStyle}>
              <h3>Lunch</h3>
              <p>{mealPlan.lunch || "Not specified"}</p>
            </div>
            <div style={mealCardStyle}>
              <h3>Dinner</h3>
              <p>{mealPlan.dinner || "Not specified"}</p>
            </div>
            <div style={buttonContainerStyle}>
              <button style={editButtonStyle} onClick={() => setEditMode(true)}>
                Edit Plan
              </button>
              <button style={deleteButtonStyle} onClick={handleDelete}>
                Delete Plan
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Breakfast</label>
              <input
                type="text"
                name="breakfast"
                value={formData.breakfast}
                onChange={handleInputChange}
                placeholder="Enter breakfast"
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Lunch</label>
              <input
                type="text"
                name="lunch"
                value={formData.lunch}
                onChange={handleInputChange}
                placeholder="Enter lunch"
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Dinner</label>
              <input
                type="text"
                name="dinner"
                value={formData.dinner}
                onChange={handleInputChange}
                placeholder="Enter dinner"
                style={inputStyle}
              />
            </div>
            <input type="hidden" name="dayOfWeek" value={formData.dayOfWeek} />
            <div style={buttonContainerStyle}>
              <button type="submit" style={saveButtonStyle}>
                Save Meal Plan
              </button>
              {mealPlan && (
                <button 
                  type="button" 
                  style={cancelButtonStyle} 
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f4f4f4",
};

const contentContainerStyle = {
  marginLeft: "220px",
  padding: "30px",
  width: "100%",
};

const headingStyle = {
  fontSize: "2rem",
  color: "#333",
  marginBottom: "20px",
};

const mealDisplayStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const mealCardStyle = {
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "600px",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
};

const editButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const saveButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default MealPlannerPage
