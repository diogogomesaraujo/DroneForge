const Part = require('../Models/Part');
const Drone = require('../Models/Drone');

// Get all available parts
const getDroneParts = async (req, res) => {
  try {
    const parts = await Part.find({});
    res.setHeader('Content-Type', 'application/json');
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new drone
const createDrone = async (req, res) => {
  const { name, parts, totalPrice } = req.body;

  try {
    const newDrone = new Drone({
      user: req.user._id,
      name,
      parts,
      totalPrice,
    });

    const createdDrone = await newDrone.save();
    res.status(201).json(createdDrone);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new part
const addPart = async (req, res) => {
  const { name, price, type, imageUrl } = req.body;

  if (!name || !price || !type || !imageUrl) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newPart = new Part({
      name,
      price,
      type,
      imageUrl,
    });

    const createdPart = await newPart.save();
    res.status(201).json(createdPart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getDroneParts,
  createDrone,
  addPart,
};
