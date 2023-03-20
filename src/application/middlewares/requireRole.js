const jwt = require('jsonwebtoken');
// Middleware functions to check the user's role before allowing them to access certain routes. 
function requireRole(role) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userRole = decodedToken.role;

      if (userRole !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
module.exports = requireRole;