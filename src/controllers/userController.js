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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingActivity = await Activity.findOne({
      userId: req.user._id,
      date: { $gte: today, $lt: tomorrow },
    })

    if(existingActivity){
      return res.status(400).json({ success: false, message: 'Activity already exists for today' });
    }

    const activity = {
      sleep,
      water,
      steps,
      userId: req.user._id,
    };
    const createdAActvity = await Activity.create(activity);
    if(!createdAActvity){
      return res.status(400).json({ success: false, message: 'Activity not created'});
    }

    res.status(201).json({ success: true, message: 'Activity Created!' });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

exports.getActivities = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const activities = await Activity.find({userId: req.user._id,date: {
      $gte: startOfDay,
      $lte: endOfDay
    }});

    res.status(200).json({ success: true,activities, message: 'Activity Found!' });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};