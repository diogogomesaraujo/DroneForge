import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="custom-landing-page">
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" className="custom-navbar-brand">droneforge.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto custom-nav-links">
              <Nav.Link href="#workspace" className="custom-nav-link">Workspace</Nav.Link>
              <Nav.Link href="#about" className="custom-nav-link">About</Nav.Link>
              <Nav.Link href="#signin" className="custom-nav-link">Sign In</Nav.Link>
              <Button href="#signup" className="custom-btn-signup">Sign Up for Free</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="custom-hero-section"></div>
    </div>
  );
};

export default LandingPage;
