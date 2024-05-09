const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Route for user registration
router.post('/register', userController.registerUser);

// Define other user routes for authentication, profile update, etc.

module.exports = router;
