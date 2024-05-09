import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        // User registered successfully, redirect to login page or perform desired action
        console.log('Registration successful');
        setError('');
      } else {
        // Handle errors from the server
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setError('An error occurred while registering');
    }
  };

  return (
    <Container>
      <div className="form-container">
        <div className="form-column">
          <h2>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} id="signup-form">
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </Form.Group>
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
            <Button variant="primary" type="submit" className="submit-button">Sign Up</Button>
          </Form>
        </div>
        <div className="logo-column">
          {/* Add your site logo or text here */}
          <h1>Site Logo or Text</h1>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
