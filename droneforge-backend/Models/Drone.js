const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  parts: {
    frame: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
    motor: { part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' }, quantity: Number },
    controller: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
    propeller: { part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' }, quantity: Number },
    battery: { part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' }, quantity: Number },
    camera: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
    gps: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' },
    sensor: { part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part' }, quantity: Number },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['in progress', 'completed', 'shipped'],
    default: 'in progress',
  },
  imageUrl: {
    type: String,
  },
  specifications: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    maxSpeed: Number,
    flightTime: Number,
  },
  assemblyDate: {
    type: Date,
  },
  warranty: {
    period: Number, // in months
    details: String,
  },
}, { timestamps: true });

const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;
