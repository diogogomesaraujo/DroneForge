import React, { useState, useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { ArrowsAngleContract, ArrowsAngleExpand } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import { jwtDecode } from 'jwt-decode'; // Correct named import
import './Sidebar.css'; // Custom CSS for styling specific to Sidebar
import userAvatar from '../../assets/Avatars/pastel-blue.png'; // Import the image

const Sidebar = () => {
  // Read the initial state from localStorage or default to false
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState === 'true'; // Convert to boolean
  });
  const [clicked, setClicked] = useState(false); // State to track if the button is clicked
  const [userInfo, setUserInfo] = useState({ name: '', username: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Log the decoded token to the console
        setUserInfo({ name: decodedToken.name, username: decodedToken.username });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    localStorage.setItem('sidebarCollapsed', newCollapsedState); // Save the state to localStorage
    setClicked(true); // Set clicked state to true when button is clicked
    setTimeout(() => setClicked(false), 300); // Reset clicked state after 300ms
  };

  return (
    <>
      <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              <img src={userAvatar} alt="User Avatar" />
            </div>
            {!collapsed && (
              <div className="user-details ms-2">
                <p className="m-0">Workspace</p>
                <small>@{userInfo.username}</small>
              </div>
            )}
          </div>
        </div>
        <div className="sidebar-content">
          <Nav className="flex-column">
            <NavLink 
              to="/workspace/dashboard" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon">🏠</span> 
              <span className="link-text">Dashboard</span>
              {collapsed && <span className="tooltip">Dashboard</span>}
            </NavLink>
            <NavLink 
              to="/workspace/drone-builder" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon">🛠️</span> 
              <span className="link-text">Drone Builder</span>
              {collapsed && <span className="tooltip">Drone Builder</span>}
            </NavLink>
            <NavLink 
              to="/workspace/saved" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon">💾</span> 
              <span className="link-text">Saved</span>
              {collapsed && <span className="tooltip">Saved</span>}
            </NavLink>
            <NavLink 
              to="/workspace/explore" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon">🔍</span> 
              <span className="link-text">Explore</span>
              {collapsed && <span className="tooltip">Explore</span>}
            </NavLink>
            <NavLink 
              to="/workspace/edit-profile" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon">✏️</span> 
              <span className="link-text">Edit Profile</span>
              {collapsed && <span className="tooltip">Edit Profile</span>}
            </NavLink>
            <NavLink 
              to="/workspace/settings" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon">⚙️</span> 
              <span className="link-text">Settings</span>
              {collapsed && <span className="tooltip">Settings</span>}
            </NavLink>
          </Nav>
        </div>
        {!collapsed && (
          <div className="sidebar-footer">
            <NavLink to="/" className="sidebar-footer-link">droneforge.</NavLink>
          </div>
        )}
      </div>
      <Button variant="link" className={`floating-collapse-btn ${collapsed ? 'collapsed' : ''} ${clicked ? 'clicked' : ''}`} onClick={toggleSidebar}>
        {collapsed ? <ArrowsAngleExpand /> : <ArrowsAngleContract />}
      </Button>
    </>
  );
};

export default Sidebar;
