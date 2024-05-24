import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import DroneBuilder from './Components/DroneBuilder/DroneBuilder';
import StatisticsPage from './Components/StatisticsPage/StatisticsPage';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workspace" element={<DroneBuilder />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/" element={<LandingPage />}/>
      </Routes>
    </Router>
  );
}

export default App;

