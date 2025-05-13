import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MealPlanService from "../../services/MealPlanService";
import { FaSave, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const MEAL_BG =
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=1200&q=80";

const MealPlannerForm = () => {
  const { dayOfWeek: selectedDay } = useParams();
  const navigate = useNavigate();

  const [meals, setMeals] = useState({
    breakfast: "",
    snacks: "",
    lunch: "",
    dinner: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await MealPlanService.getMealPlanByDay(selectedDay);
        if (response) {
          setMeals({
            breakfast: response.breakfast || "",
            snacks: response.snacks || "",
            lunch: response.lunch || "",
            dinner: response.dinner || "",
          });
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    if (selectedDay) fetchMealPlan();
  }, [selectedDay]);

  
  // Optional: Hide success alert after 2 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (event) => {
    setMeals({ ...meals, [event.target.name]: event.target.value.trimStart() });
    setErrors({ ...errors, [event.target.name]: "" });
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!meals.breakfast.trim()) {
      newErrors.breakfast = "Breakfast cannot be empty.";
      isValid = false;
    }
    if (!meals.lunch.trim()) {
      newErrors.lunch = "Lunch cannot be empty.";
      isValid = false;
    }
    if (!meals.dinner.trim()) {
      newErrors.dinner = "Dinner cannot be empty.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const requestData = {
        dayOfWeek: selectedDay,
        breakfast: meals.breakfast.trim() || "Not specified",
        snacks: meals.snacks.trim() || "Not specified",
        lunch: meals.lunch.trim() || "Not specified",
        dinner: meals.dinner.trim() || "Not specified",
      };

      if (isEditing) {
        await MealPlanService.updateMealPlan(selectedDay, requestData);
      } else {
        await MealPlanService.createMealPlan(requestData);
      }

      setSuccessMessage("Meal plan saved successfully!");

      // Redirect after 1.2 seconds
      setTimeout(() => {
        navigate("/all-meal-plans");
      }, 1200);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to save meal plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={outerContainerStyle}>
      <div style={overlayStyle} />
      <div style={containerStyle}>
        <h1>Meal Planner for {selectedDay}</h1>

        {/* Alerts */}
        {errorMessage && <div style={alertStyle}>{errorMessage}</div>}
        {successMessage && <div style={successAlertStyle}>{successMessage}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          {Object.keys(meals).map((meal, index) => (
            <div key={index} style={formGroupStyle}>
              <label style={labelStyle}>
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </label>
              <input
                type="text"
                name={meal}
                value={meals[meal]}
                onChange={handleChange}
                placeholder={`Enter ${meal} items`}
                style={inputStyle}
                disabled={loading}
              />
              {errors[meal] && <p style={errorStyle}>{errors[meal]}</p>}
            </div>
          ))}
          <div style={buttonContainerStyle}>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? (
                <ClipLoader color="white" size={20} />
              ) : (
                <FaSave style={iconStyle} />
              )}
              {loading ? "Saving..." : "Save Meal Plan"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/meal-planner")}
              style={buttonStyleSecondary}
              disabled={loading}
            >
              <FaTimes style={iconStyle} />
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Styles ---
const outerContainerStyle = {
  minHeight: "100vh",
  width: "100vw",
  position: "relative",
  backgroundImage: `url('${MEAL_BG}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 0,
};

const containerStyle = {
  textAlign: "center",
  padding: "40px",
  backgroundColor: "rgba(255,255,255,0.92)",
  borderRadius: "10px",
  width: "90%",
  margin: "0 auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  zIndex: 1,
  position: "relative",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formGroupStyle = {
  margin: "15px 0",
  width: "100%",
};

const labelStyle = {
  fontSize: "16px",
  marginBottom: "5px",
  display: "inline-block",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginTop: "5px",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "5px",
};

const alertStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "5px",
  textAlign: "center",
  border: "1px solid #f5c6cb",
};

const successAlertStyle = {
  backgroundColor: "#d4edda",
  color: "#155724",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "5px",
  textAlign: "center",
  border: "1px solid #c3e6cb",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginTop: "20px",
};

const buttonStyle = {
  padding: "12px 25px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  minWidth: "150px",
  justifyContent: "center",
};

const buttonStyleSecondary = {
  ...buttonStyle,
  backgroundColor: "#f44336",
};

const iconStyle = {
  fontSize: "18px",
};

export default MealPlannerForm;
