import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-landing-page">
      <Navbar expand="lg" className="landing-navbar-custom">
        <Container>
          <Navbar.Brand href="#home" className="landing-navbar-brand-custom">droneforge.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto landing-nav-links-custom">
              <Nav.Link href="#workspace" className="landing-nav-link-custom">Workspace</Nav.Link>
              <Nav.Link href="#about" className="landing-nav-link-custom">About</Nav.Link>
              <Nav.Link href="#signin" className="landing-btn-signin">Sign In</Nav.Link>
              <Button href="#signup" className="landing-btn-signup">Sign Up for Free</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container fluid className="landing-hero-section text-center">
        <h1 className="landing-hero-title">Build Your Drones <span role="img" aria-label="rocket">🚀</span></h1>
        <h2 className="landing-hero-subtitle">Customize and Control Every Aspect</h2>
        <p className="landing-hero-text">With <span className="landing-bold-purple">DroneForge</span>, building your dream 🚁 is as easy as a few clicks ✨. Customize every part to match your exact needs and preferences 🔧.</p>
        <Button variant="primary" size="lg" className="landing-btn-get-started">Get Started</Button>
      </Container>
      
      <Container fluid className="landing-features-section text-center">
        <h3>Why Choose <span className="landing-highlight">DroneForge</span>?</h3>
        <p>Effortlessly customize your drone with our user-friendly interface. Select from a wide range of parts and build a drone that fits your specific requirements.</p>
        <Button variant="link" className="landing-btn-learn-more">Learn More</Button>
      </Container>
      
      <Container fluid className="landing-how-it-works-section text-center">
        <h3>How It Works</h3>
        <div className="landing-steps-container">
          <div className="landing-step">
            <div className="landing-icon-box"><i className="fas fa-sign-in-alt"></i></div>
            <h4>Step 1</h4>
            <p>Sign up for an account and start your drone building journey.</p>
          </div>
          <div className="landing-step">
            <div className="landing-icon-box"><i className="fas fa-cogs"></i></div>
            <h4>Step 2</h4>
            <p>Select and customize parts from our extensive catalog.</p>
          </div>
          <div className="landing-step">
            <div className="landing-icon-box"><i className="fas fa-rocket"></i></div>
            <h4>Step 3</h4>
            <p>Assemble your drone and get ready to take flight.</p>
          </div>
        </div>
      </Container>
      
      <Container fluid className="landing-footer-section text-center">
        <p>&copy; 2024 DroneForge. All rights reserved.</p>
      </Container>
    </div>
  );
};

export default LandingPage;
