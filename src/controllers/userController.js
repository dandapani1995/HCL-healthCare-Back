const User = require('../models/user');
const Message = require('../utills/constant')

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