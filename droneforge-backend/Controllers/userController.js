const User = require('../Models/userModel');

// Controller function to handle user registration
exports.registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;
    
    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Other controller functions for user authentication, profile update, etc.
