import axios from 'axios';

const API_URL = 'http://localhost:8080/api/mealplan';

class MealPlanService {
  static getAllMealPlans() {
    return axios.get(`${API_URL}/all`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching meal plans:', error);
        throw error;
      });
  }

  static getMealPlanByDay(dayOfWeek) {
    return axios.get(`${API_URL}/day/${dayOfWeek}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching meal plan for ${dayOfWeek}:`, error);
        throw error;
      });
  }

  static async createMealPlan(mealPlanData) {
    try {
      const payload = {
        dayOfWeek: mealPlanData.dayOfWeek?.toUpperCase(),
        breakfast: mealPlanData.breakfast || "Not specified",
        lunch: mealPlanData.lunch || "Not specified",
        dinner: mealPlanData.dinner || "Not specified",
        snacks: mealPlanData.snacks || "None"
      };
  
      console.log("Sending payload:", payload);
      
      const response = await axios.post(`${API_URL}/create`, payload);
      return response.data;
    } catch (error) {
      console.error("Creation failed:", {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      throw new Error(error.response?.data?.message || "Failed to create meal plan");
    }
  }

  static updateMealPlan(dayOfWeek, mealPlanData) {
    const formattedDay = dayOfWeek.replace(/\s+/g, '').toLowerCase();
    
    return axios.put(`${API_URL}/update/${formattedDay}`, {
      dayOfWeek: mealPlanData.dayOfWeek,
      breakfast: mealPlanData.breakfast,
      snacks: mealPlanData.snacks,
      lunch: mealPlanData.lunch,
      dinner: mealPlanData.dinner
    })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error updating meal plan for ${dayOfWeek}:`, error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    });
  }

  static deleteMealPlan(id) {
    return axios.delete(`${API_URL}/delete/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error deleting meal plan ${id}:`, error);
        throw error;
      });
  }
}

export default MealPlanService;