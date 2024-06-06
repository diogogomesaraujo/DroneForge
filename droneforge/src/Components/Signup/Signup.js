import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // Import Signup CSS
import lottie from 'lottie-web';
import backgroundImage from '../../assets/person-signup.svg'; // Import the SVG image
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Import Eye icons

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const animationContainer = useRef(null);
    const animationInstance = useRef(null);

    useEffect(() => {
        const loadAnimation = async () => {
            try {
                const response = await fetch('https://lottie.host/e6f0719e-2a73-425e-bb2a-060e348b2ebb/l3tqaZFSSh.json');
                const data = await response.json();

                if (animationInstance.current) {
                    animationInstance.current.destroy(); // Clean up the previous instance if it exists
                }

                animationInstance.current = lottie.loadAnimation({
                    container: animationContainer.current, // the container element
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: data, // the animation data
                });
            } catch (error) {
                console.error('Failed to load animation data:', error);
            }
        };

        loadAnimation();

        // Cleanup function to destroy Lottie instance when component unmounts or re-renders
        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

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
                const data = await response.json();
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                console.log('Registration successful');
                setError('');
                // Redirect to the main page
                navigate('/main');
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
        <div className="signup-container">
            <div className="signup-background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <Link to="/" className="site-name">droneforge.</Link>
            <div className="signup-form-container">
                <div className="signup-content">
                    <h2 className="signup-title">Join us! 🚀</h2>
                    <p className="signup-subtitle">Sign up to make your 🚁 assembly projects with <strong>Drone Forge</strong>.</p>
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="formUsername">
                            <Form.Control type="text" placeholder="Username" required onChange={handleUsernameChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Control type="email" placeholder="Email" required onChange={handleEmailChange} />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="password-group">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                onChange={handlePasswordChange}
                            />
                            <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <EyeSlash /> : <Eye />}
                            </div>
                        </Form.Group>
                        <Button type="submit" className="signup-button">Sign Up</Button>
                        <div className="auth-links">
                            <Link to="/login" className="login-link">Already have an account? Login here!</Link>
                        </div>
                    </Form>
                </div>
                <div className="logo-container" ref={animationContainer}></div>
            </div>
        </div>
    );
}

export default Signup;
