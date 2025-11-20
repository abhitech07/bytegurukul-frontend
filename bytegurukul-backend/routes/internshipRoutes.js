const express = require('express');
const router = express.Router();
const { Application } = require('../models');

// @route   POST /api/internship/apply
// @desc    Submit a new internship application
router.post('/apply', async (req, res) => {
  try {
    const { name, email, phone, university, resumeText, roleId } = req.body;

    // Basic Validation
    if (!name || !email || !phone || !roleId) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields." });
    }

    // Create new entry in database
    const newApplication = await Application.create({
      name,
      email,
      phone,
      university,
      resumeText,
      roleId
    });

    res.status(201).json({ 
        success: true, 
        message: "Application submitted successfully!", 
        data: newApplication 
    });

  } catch (error) {
    console.error("Application Error:", error);
    res.status(500).json({ success: false, message: "Server Error. Please try again later." });
  }
});

// @route   GET /api/internship/all
// @desc    Get all applications (For Admin Dashboard)
router.get('/all', async (req, res) => {
    try {
        // Fetch all, ordered by newest first
        const applications = await Application.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/internship/:id/status
// @desc    Update status (e.g., Approve/Reject)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const app = await Application.findByPk(req.params.id);
        
        if (!app) return res.status(404).json({ message: "Application not found" });

        app.status = status;
        await app.save();

        res.json({ success: true, data: app });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;