const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// 🔐 Define routes
router.get('/profile', verifyToken,authController.getProfile);

module.exports = router;
