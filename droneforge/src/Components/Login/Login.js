import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // User logged in successfully, extract token from response
        const data = await response.json();
        const token = data.token;
        // Store token securely
        localStorage.setItem('token', token);
        // Redirect to homepage
        navigate('/');
      } else {
        // Handle login failure
        console.error('Login failed:', response.statusText);
        setError('Invalid email or password');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('An error occurred during login:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <Container>
      <div className="form-container">
        <div className="form-column">
          <h2>Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} id="login-form">
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-button">Login</Button>
          </Form>
          <div className="forgot-password-link">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="signup-link">
            <Link to="/signup">Don't have an account? Sign up here</Link>
          </div>
        </div>
        <div className="logo-column">
          {/* Add your site logo or text here */}
          <h1>Site Logo or Text</h1>
        </div>
      </div>
    </Container>
  );
}

export default Login;
