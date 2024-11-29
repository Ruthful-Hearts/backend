const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden. You do not have access to this resource.' });
    }
    next();
  };
};

module.exports = authorizeRoles;
