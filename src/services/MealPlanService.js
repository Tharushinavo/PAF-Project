import axios from 'axios';

const API_URL = 'http://localhost:8080/api/meal-plans';

class MealPlanService {
  // Get all meal plans
  getAllMealPlans() {
    return axios.get(API_URL)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching meal plans:', error);
        throw error;
      });
  }

  // Get a single meal plan by ID
  getMealPlanById(id) {
    return axios.get(`${API_URL}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching meal plan ${id}:`, error);
        throw error;
      });
  }

  // Create a new meal plan
  createMealPlan(mealPlanData) {
    return axios.post(API_URL, mealPlanData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating meal plan:', error);
        throw error;
      });
  }

  // Update an existing meal plan
  updateMealPlan(id, mealPlanData) {
    return axios.put(`${API_URL}/${id}`, mealPlanData)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error updating meal plan ${id}:`, error);
        throw error;
      });
  }

  // Delete a meal plan
  deleteMealPlan(id) {
    return axios.delete(`${API_URL}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error deleting meal plan ${id}:`, error);
        throw error;
      });
  }
}

const mealPlanService = new MealPlanService();
export default mealPlanService;
