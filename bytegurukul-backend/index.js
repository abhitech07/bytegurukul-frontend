require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); 

// Import Routes (Must be done BEFORE using them)
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Changed to 5000 to match your frontend config

// Middleware
app.use(cors()); // Allows frontend to make requests
app.use(express.json()); // Parses incoming JSON requests

// Basic Test Route
app.get('/api', (req, res) => {
  res.send('ByteGurukul Backend is Running!');
});

// Mount API routes
app.use('/api/auth', authRoutes);     // Matches http://localhost:5000/api/auth
app.use('/api/courses', courseRoutes); // Matches http://localhost:5000/api/courses

// Start Server and Sync Database
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    // Test the database connection and synchronize models
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // `sync({ alter: true })` updates tables if models change
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});