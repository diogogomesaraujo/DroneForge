const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const { secretKey } = require('../Config/config');

// Controller function to handle user registration
exports.registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token using the secret key
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '1h' });

    // Respond with success message and token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};
