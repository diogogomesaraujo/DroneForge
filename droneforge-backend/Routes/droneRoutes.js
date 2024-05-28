const express = require('express');
const router = express.Router();
const droneController = require('../Controllers/droneController');
const authMiddleware = require('../Middleware/authMiddleware');

// Route for getting all drone parts
router.get('/parts', authMiddleware, droneController.getDroneParts);

// Route for creating a new drone
router.post('/create', authMiddleware, droneController.createDrone);

// Route to add a new part
router.post('/parts', droneController.addPart);

module.exports = router;
