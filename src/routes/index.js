const express = require('express');
const router = express.Router();

const authRoutes  = require('../routes/authRoutes');
const userRoutes  = require('../routes/userRoutes');

// 🔐 Define routes
router.post('/auth', authRoutes);
router.post('/auth', userRoutes);

module.exports = router;
