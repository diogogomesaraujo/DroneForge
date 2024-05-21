import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Sidebar from './Components/Sidebar/Sidebar';
import DroneBuilder from './Components/DroneBuilder/DroneBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sidebar" element={<Sidebar/>} />
        <Route path="/workspace" element={<DroneBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
