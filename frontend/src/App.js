import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import UserProfile from './components/UserProfile/UserProfile';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import WeekdayCards from './components/Meal Plan/WeekdayCards';
import AllMealPlans from "./components/Meal Plan/AllMealPlans";
import MealPlannerForm from "./components/Meal Plan/MealPlannerForm";

//

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/updateprofile/:id" element={<UpdateProfile />} />
        <Route path="/meal-planner" element={<WeekdayCards />} />
        <Route path="/meal-planner/:dayOfWeek" element={<MealPlannerForm />} />
        <Route path="/all-meal-plans" element={<AllMealPlans />} />
        

      </Routes>
    </Router>
  );
}

export default App;