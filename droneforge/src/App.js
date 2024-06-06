import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import DroneBuilder from './Components/DroneBuilder/DroneBuilder';
import LandingPage from './Components/LandingPage/LandingPage';
import Dashboard from './Components/Dashboard/Dashboard';
import DroneInfo from './Components/DroneInfo/DroneInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/workspace/dashboard' element={<Dashboard />}/>
        <Route path="/workspace/drone-builder" element={<DroneBuilder />} />
        <Route path="/" element={<LandingPage />}/>
        <Route path="/drone-info" element={<DroneInfo />}/>
      </Routes>
    </Router>
  );
}

export default App;
