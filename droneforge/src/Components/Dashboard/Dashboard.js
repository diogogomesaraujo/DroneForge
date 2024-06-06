import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwtDecode
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tools, GearFill, CartFill } from 'react-bootstrap-icons';  // Changed to a better icon for sales

const data = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 22 },
  { name: 'Fri', value: 17 },
  { name: 'Sat', value: 19 },
  { name: 'Sun', value: 14 },
];

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [selectedCard, setSelectedCard] = useState('approval');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const getCardData = () => {
    switch (selectedCard) {
      case 'approval':
        return { data, color: '#afe9e0', title: 'Weekly <strong>Drones Built</strong>', gradientStart: '#afe9e0', gradientEnd: '#70e4c6' };
      case 'disputes':
        return { data, color: '#f9c9b6', title: 'Most <strong>Used Parts</strong>', gradientStart: '#f9c9b6', gradientEnd: '#f6a084' };
      case 'messages':
        return { data, color: '#f9c9e0', title: 'Weekly <strong>Sales</strong>', gradientStart: '#f9c9e0', gradientEnd: '#f6a8d6' };
      default:
        return { data, color: '#afe9e0', title: 'Weekly Activity', gradientStart: '#afe9e0', gradientEnd: '#70e4c6' };
    }
  };

  const { data: chartData, color: chartColor, title: chartTitle, gradientStart, gradientEnd } = getCardData();

  const setCardStyles = () => {
    document.documentElement.style.setProperty('--selected-gradient-start', gradientStart);
    document.documentElement.style.setProperty('--selected-gradient-end', gradientEnd);
  };

  useEffect(() => {
    setCardStyles();
  }, [selectedCard]);

  const yAxisTickFormatter = (tick) => {
    if (tick === 0) return '';
    return tick;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-background-overlay"></div>
      <Sidebar />
      <div className="dashboard-main-content">
        <div className="dashboard-header-container">
          <h1>Dashboard</h1>
          <div className="dashboard-icon-container">
            <span className="dashboard-icon-bell"></span>
            <span className="dashboard-icon-search"></span>
          </div>
        </div>
        <div className="dashboard-welcome-container">
          <div className="dashboard-welcome-content">
            <h2>Hi <strong>@{userName}</strong>! 👋</h2>
            <p>You have already completed <strong>68%</strong> from your weekly level. Keep up the good work!</p>
            <button className="dashboard-welcome-button" onClick={() => navigate('/workspace/drone-builder')}>
              Build More Drones
            </button>
          </div>
        </div>
        <div className="dashboard-cards-container">
          <div className={`dashboard-card approval ${selectedCard === 'approval' ? 'selected' : ''}`} onClick={() => setSelectedCard('approval')}>
            <div className="icon">
              <Tools />
            </div>
            <h2>4</h2>
            <p>Drones Built</p>
          </div>
          <div className={`dashboard-card disputes ${selectedCard === 'disputes' ? 'selected' : ''}`} onClick={() => setSelectedCard('disputes')}>
            <div className="icon">
              <GearFill />
            </div>
            <h2>5</h2>
            <p>Most Used Part</p>
          </div>
          <div className={`dashboard-card messages ${selectedCard === 'messages' ? 'selected' : ''}`} onClick={() => setSelectedCard('messages')}>
            <div className="icon">
              <CartFill />
            </div>
            <h2>8</h2>
            <p>Sales</p>
          </div>
        </div>
        <div className="dashboard-chart-container">
          <h2 dangerouslySetInnerHTML={{ __html: chartTitle }}></h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.8} />
                  <stop offset="75%" stopColor={chartColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={yAxisTickFormatter} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke={chartColor} fill="url(#color)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-table-container">
          <h2>Drones You Built</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jonny Patil</td>
                <td>Male</td>
                <td>10:00 AM</td>
                <td>20 Jan, 2023</td>
              </tr>
              <tr>
                <td>Maria Watson</td>
                <td>Female</td>
                <td>01:00 PM</td>
                <td>15 Jan, 2023</td>
              </tr>
              <tr>
                <td>Evan Black</td>
                <td>Female</td>
                <td>12:00 PM</td>
                <td>15 Jan, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
