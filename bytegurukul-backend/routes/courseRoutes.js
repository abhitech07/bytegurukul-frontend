const express = require('express');
const router = express.Router();
const { Course, User, Enrollment } = require('../models');
const { protect } = require('../middleware/auth');


// @route GET /api/courses
// Get all courses with filters
router.get('/', async (req, res) => {
  try {
    // Basic filter implementation example:
    const where = {};
    if (req.query.category) {
        where.category = req.query.category;
    }
    // ... add more filters as needed

    const courses = await Course.findAll({
        where,
        include: [{ model: User, as: 'instructor', attributes: ['username'] }] // Assuming you add instructorId to Course model and relationship
    });

    res.json({ success: true, data: courses, message: 'Courses fetched successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/courses/:id
// Get single course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);

        if (course) {
            res.json({ success: true, data: course, message: 'Course fetched successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// @route POST /api/courses
// Create new course (requires authentication and role check, e.g., Instructor)
router.post('/', protect, async (req, res) => {
    const { title, description, price } = req.body;
    
    // In a real application, you would check if the user is an instructor here:
    // const user = await User.findByPk(req.user);
    // if (user.role !== 'Instructor') return res.status(403).json({ message: 'Forbidden' });

    try {
        const course = await Course.create({
            title,
            description,
            price,
            instructorId: req.user // Use the ID from the token
        });

        res.status(201).json({ success: true, data: course, message: 'Course created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route POST /api/courses/:courseId/enroll
// Enroll in course
router.post('/:courseId/enroll', protect, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user;

    try {
        // 1. Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ where: { courseId, userId } });
        if (existingEnrollment) {
            return res.status(400).json({ success: false, message: 'You are already enrolled in this course.' });
        }
        
        // 2. Create new enrollment
        const enrollment = await Enrollment.create({ courseId, userId });

        res.status(201).json({ success: true, data: enrollment, message: 'Successfully enrolled in the course.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Other routes (updateCourse, deleteCourse) follow a similar pattern, ensuring the user is authorized.

module.exports = router;