const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['frame', 'motor', 'controller', 'propeller', 'battery', 'camera', 'gps', 'sensor'],
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;
