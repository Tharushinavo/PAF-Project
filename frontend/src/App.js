import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Addpost from './Addpost/Addpost';
import Home from './Home/Home';
import Display from './Display/Display';
import Update from './Update/Update';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addpost" element={<Addpost />} />
      <Route path="/display" element={<Display />} />
      <Route path="/update/:id" element={<Update />} />
   
    </Routes>
  );
}

export default App;



