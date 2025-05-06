import React from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import AddGroup from "./components/AddGroup/AddGroup";
import DisplayGroup from "./components/DisplayGroup/DisplayGroup";
import UpdateGroup from "./components/UpdateGroup/UpdateGroup";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addgroup" element={<AddGroup />} />
          <Route path="/allgroups" element={<DisplayGroup />} />
          <Route path="/updategroup/:id" element={<UpdateGroup />} />
        </Routes>
      </React.Fragment>
      
    </div>
  );
}

export default App;
