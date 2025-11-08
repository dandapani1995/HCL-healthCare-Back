const Activity = require('../models/activity')
exports.getUserProfile = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error('Email and password are required');
      err.status = 400;
      throw err;
    }

    // Example dummy authentication
    if (email === 'test@example.com' && password === '1234') {
      return res.json({ success: true, token: 'dummy-jwt-token' });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

exports.addActivity = async (req, res, next) => {
  try {
    const { sleep, water, steps } = req.body;

    const activity = {
      sleep,
      water,
      steps,
      userId: req.user._id,
    };
    const createdAActvity = await Activity.create(activity);
    if(!createdAActvity){
      return res.status(400).json({ success: false, message: 'Activity not created' });
    }

    res.status(201).json({ success: true, message: 'Activity Created!' });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({userId: req.user._id});
    if(!createdAActvity){
      return res.status(400).json({ success: false, message: 'Activity not created' });
    }

    res.status(201).json({ success: true, message: 'Activity Created!' });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};