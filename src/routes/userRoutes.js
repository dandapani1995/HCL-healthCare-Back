const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// 🔐 Define routes
router.get('/profile', verifyToken,userController.getUserProfile);

module.exports = router;
