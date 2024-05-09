const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./Routes/userRoutes');

const app = express();

// Enable CORS to allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Logging middleware
app.use(morgan('combined'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/droneforge')
  .then(() => {
    console.log('Connected to database');

    app.use('/api/users', userRoutes);
    
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
  });
