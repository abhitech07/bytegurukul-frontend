const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');


// Function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route POST /api/auth/register
// Register new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      },
      message: 'Registration successful',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route POST /api/auth/login
// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user && user.validPassword(password)) {
      res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          token: generateToken(user.id),
        },
        message: 'Login successful',
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/auth/me
// Get current user profile
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findByPk(req.user, {
            attributes: { exclude: ['password'] } // Exclude password from response
        });

        if (user) {
            res.json({ success: true, data: user, message: 'Profile fetched successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;