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