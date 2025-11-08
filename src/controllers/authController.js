exports.login = async (req, res, next) => {
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

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const err = new Error('All fields are required');
      err.status = 400;
      throw err;
    }
    // Simulate DB operation
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    // Example data
    res.json({ success: true, user: { id: 1, name: 'John Doe', email: 'test@example.com' } });
  } catch (error) {
    next(error);
  }
};
