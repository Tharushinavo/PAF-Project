import React from "react";
import { Route, Routes } from "react-router-dom";
import Addpost from "./Addpost/Addpost"; 
import Home from "./Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addpost" element={<Addpost />} />
      </Routes>
    </div>
  );
}

export default App;


