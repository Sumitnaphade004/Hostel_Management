const jwt = require('jsonwebtoken');

// Middleware to protect routes for web and API/mobile
function authMiddleware(req, res, next) {
  // Get token from cookies or Authorization header
  const token =
    req.cookies?.token ||
    (req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null);

  if (!token) {
    // If it's an API request (starts with /app or Accept JSON), send JSON
    if (req.originalUrl.startsWith('/app') || req.headers.accept?.includes('application/json')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    // Otherwise, redirect for web
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.locals.loginRole = decoded; // for web templates
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);

    if (req.originalUrl.startsWith('/app') || req.headers.accept?.includes('application/json')) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    return res.redirect('/');
  }
}

// Token generator
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '2d' });
};

module.exports = {
  authMiddleware,
  generateToken,
};
