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

// Count drones
const countDrones = async (req, res) => {
  try {
    const droneCount = await Drone.countDocuments();
    res.status(200).json({ count: droneCount });
  } catch (error) {
    res.status(500).json({ message: 'Error counting drones.', error});
  }
};

// Count drones by time intervals
const countDronesByTimeIntervals = async (req, res) => {
  try {
    const now = new Date();
    
    const intervals = {
      'pastDay': new Date(now.getTime() - 24 * 60 * 60 * 1000),
      'pastWeek': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      'pastMonth': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      'pastYear': new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
    };

    const counts = {};

    for (const [interval, date] of Object.entries(intervals)) {
      counts[interval] = await Drone.countDocuments({ createdAt: { $gte: date } });
    }

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: 'Error counting drones by intervals', error });
  }
};

// Get the most used part
const getMostUsedPart = async (req, res) => {
  try {
    const drones = await Drone.find();

    const partCounts = {};

    const countPart = (partId, quantity = 1) => {
      if (partCounts[partId]) {
        partCounts[partId] += quantity;
      } else {
        partCounts[partId] = quantity;
      }
    };

    drones.forEach((drone) => {
      if (drone.parts.frame) countPart(drone.parts.frame);
      if (drone.parts.motor) countPart(drone.parts.motor.part, drone.parts.motor.quantity);
      if (drone.parts.controller) countPart(drone.parts.controller);
      if (drone.parts.propeller) countPart(drone.parts.propeller.part, drone.parts.propeller.quantity);
      if (drone.parts.battery) countPart(drone.parts.battery.part, drone.parts.battery.quantity);
      if (drone.parts.camera) countPart(drone.parts.camera);
      if (drone.parts.gps) countPart(drone.parts.gps);
      if (drone.parts.sensor) countPart(drone.parts.sensor.part, drone.parts.sensor.quantity);
    });

    const mostUsedPartId = Object.keys(partCounts).reduce((a, b) => (partCounts[a] > partCounts[b] ? a : b));

    const mostUsedPart = await Part.findById(mostUsedPartId);

    res.status(200).json({
      part: mostUsedPart,
      count: partCounts[mostUsedPartId]
    });
  } catch (error) {
    res.status(500).json({ message: 'Error finding most used part', error });
  }
};

module.exports = {
  getDroneParts,
  createDrone,
  addPart,
  countDrones,
  countDronesByTimeIntervals,
  getMostUsedPart
};
