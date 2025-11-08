const User = require('../models/user')
const Role = require('../models/role')
const {generateToken} = require('../utills/jwtService');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error('Email and password are required');
      err.status = 400;
      throw err;
    }
    const userData = await User.findOne({email:email});
    const isMatch = await bcrypt.compare(password, userData.password);
    if(!isMatch){
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }else{
        // Example dummy authentication
         const token =  generateToken({id:userData._id,name:userData.name,role:userData.role,email:userData.email});
         res.status(200).json({ success: true,data:token, message: 'User login successfully' });
    }

  } catch (error) {
    next(error); // Pass to global error handler
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password ,username,role} = req.body;
    if (!name || !email || !password||! username ||!role) {
      const err = new Error('All fields are required');
      err.status = 400;
      throw err;
    }
     const RoleData = await Role.findOne({role:role});
     if(!RoleData){
        const err = new Error('Role not defined');
      err.status = 404;
      throw err;
     }
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);
     req.body.password = hash;
     req.body.role = RoleData._id;
     const result = await User.create(req.body)
     const token =  generateToken({id:result._id,name,role,email});
    // Simulate DB operation
    res.status(201).json({ success: true,data:token, message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

