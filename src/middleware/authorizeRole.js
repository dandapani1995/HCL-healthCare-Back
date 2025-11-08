const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(403).json({ message: 'No role assigned to user' });
      }
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied: insufficient role permissions' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Role validation failed', error: error.message });
    }
  };
};

module.exports = authorizeRole;
