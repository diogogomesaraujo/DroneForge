import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { ArrowsAngleContract, ArrowsAngleExpand } from 'react-bootstrap-icons';
import './Sidebar.css'; // Custom CSS for styling
import userAvatar from '../../assets/Avatars/purple.png'; // Import the image

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('dashboard');
  const [activeFooterLink, setActiveFooterLink] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [clicked, setClicked] = useState(false); // State to track if the button is clicked

  const handleNavClick = (link) => {
    setActiveLink(link);
    setActiveFooterLink(null); // Reset footer link active state
  };

  const handleFooterNavClick = (link) => {
    setActiveFooterLink(link);
    setActiveLink(null); // Reset main link active state
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
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
                <p className="m-0">Diogo Araújo</p>
                <small>@diogoaraujo_04</small>
              </div>
            )}
          </div>
        </div>
        <div className="sidebar-content">
          <Nav className="flex-column">
            <Nav.Link 
              href="#dashboard" 
              className={`sidebar-link ${activeLink === 'dashboard' ? 'active' : ''}`} 
              onClick={() => handleNavClick('dashboard')}
            >
              <span className={`icon ${activeLink === 'dashboard' ? 'active-icon' : ''}`}>🏠</span> 
              <span className="link-text">Dashboard</span>
              {collapsed && <span className="tooltip">Dashboard</span>}
            </Nav.Link>
            <Nav.Link 
              href="#drone-builder" 
              className={`sidebar-link ${activeLink === 'drone-builder' ? 'active' : ''}`} 
              onClick={() => handleNavClick('drone-builder')}
            >
              <span className={`icon ${activeLink === 'drone-builder' ? 'active-icon' : ''}`}>🛠️</span> 
              <span className="link-text">Drone Builder</span>
              {collapsed && <span className="tooltip">Drone Builder</span>}
            </Nav.Link>
            <Nav.Link 
              href="#saved" 
              className={`sidebar-link ${activeLink === 'saved' ? 'active' : ''}`} 
              onClick={() => handleNavClick('saved')}
            >
              <span className={`icon ${activeLink === 'saved' ? 'active-icon' : ''}`}>💾</span> 
              <span className="link-text">Saved</span>
              {collapsed && <span className="tooltip">Saved</span>}
            </Nav.Link>
            <Nav.Link 
              href="#explore" 
              className={`sidebar-link ${activeLink === 'explore' ? 'active' : ''}`} 
              onClick={() => handleNavClick('explore')}
            >
              <span className={`icon ${activeLink === 'explore' ? 'active-icon' : ''}`}>🔍</span> 
              <span className="link-text">Explore</span>
              {collapsed && <span className="tooltip">Explore</span>}
            </Nav.Link>
            <Nav.Link 
              href="#statistics" 
              className={`sidebar-link ${activeLink === 'statistics' ? 'active' : ''}`} 
              onClick={() => handleNavClick('statistics')}
            >
              <span className={`icon ${activeLink === 'statistics' ? 'active-icon' : ''}`}>📊</span> 
              <span className="link-text">Statistics</span>
              {collapsed && <span className="tooltip">Statistics</span>}
            </Nav.Link>
            <Nav.Link 
              href="#edit-profile" 
              className={`sidebar-link ${activeFooterLink === 'edit-profile' ? 'active' : ''}`}
              onClick={() => handleFooterNavClick('edit-profile')}
            >
              <span className={`icon ${activeFooterLink === 'edit-profile' ? 'active-icon' : ''}`}>✏️</span> 
              <span className="link-text">Edit Profile</span>
              {collapsed && <span className="tooltip">Edit Profile</span>}
            </Nav.Link>
            <Nav.Link 
              href="#settings" 
              className={`sidebar-link ${activeFooterLink === 'settings' ? 'active' : ''}`}
              onClick={() => handleFooterNavClick('settings')}
            >
              <span className={`icon ${activeFooterLink === 'settings' ? 'active-icon' : ''}`}>⚙️</span> 
              <span className="link-text">Settings</span>
              {collapsed && <span className="tooltip">Settings</span>}
            </Nav.Link>
          </Nav>
        </div>
        {!collapsed && (
          <div className="sidebar-footer">
            <p>droneforge.</p>
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
