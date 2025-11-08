const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { Authentication } = require('../middleware/authMiddleware');

// 🔐 Define routes
router.get('/profile', Authentication, userController.getUserProfile);
router.post('/addActivity', Authentication, userController.addActivity);
router.get('/getActivity', Authentication, userController.getActivities);

module.exports = router;
