const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./Routes/userRoutes');
const droneRoutes = require('./Routes/droneRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(morgan('combined'));

mongoose.connect('mongodb://localhost:27017/droneforge')
  .then(() => {
    console.log('Connected to database');

    app.use('/api/users', userRoutes);
    app.use('/api/drones', droneRoutes);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
  });
