require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const path = require('path'); // Required for file paths
const { sequelize } = require('./models'); 

// Import Routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const internshipRoutes = require('./routes/internshipRoutes'); 
const pyqRoutes = require('./routes/pyqRoutes'); // <--- 1. Import new route

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// --- CRITICAL: SERVE STATIC FILES ---
// This allows access to files at http://localhost:5000/uploads/filename.pdf
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Basic Test Route
app.get('/api', (req, res) => {
  res.send('ByteGurukul Backend is Running!');
});

// Mount API routes
app.use('/api/auth', authRoutes);     
app.use('/api/courses', courseRoutes); 
app.use('/api/internship', internshipRoutes); 
app.use('/api/pyq', pyqRoutes); // <--- 2. Mount new route

// Start Server and Sync Database
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync models (use { alter: true } to update existing tables without dropping data)
    await sequelize.sync({ alter: true }); 
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});