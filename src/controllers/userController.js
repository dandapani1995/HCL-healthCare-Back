const User = require('../models/user');
const Message = require('../utills/constant');
const Activity = require('../models/activity');


exports.getUserProfile = async (req, res, next) => {
  try {
    const { email} = req.body;
    if (!email) {
      const err = new Error(Message[1008]);
      err.status = 404;
      throw err;
    }
    const userData = await User.findOne({email:email});
   if (!userData) {
      const err = new Error(Message[1001]);
      err.status = 400;
      throw err;
    }
    return res.json({ success: true, data:userData });
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
    res.status(200).json({ success: true, message: 'Activity Created!' });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};