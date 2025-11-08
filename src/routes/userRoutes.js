const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authorizeRole = require('../middleware/authorizeRole');


// 🔐 Define routes
router.get('/profile', authorizeRole('admin','user','provider'), userController.getUserProfile);
router.post('/addActivity', authorizeRole('admin','user','provider'), userController.addActivity);
router.get('/getActivity', authorizeRole('admin','user','provider'), userController.getActivities);

module.exports = router;
