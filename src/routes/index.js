const express = require('express');
const router = express.Router();

const authRoutes  = require('./authRoutes');
const userRoutes  = require('../routes/userRoutes');
const { Authentication } = require('../middleware/authMiddleware');

// 🔐 Define routes
router.use('/auth', authRoutes);
router.use('/user',Authentication, userRoutes);

module.exports = router;
