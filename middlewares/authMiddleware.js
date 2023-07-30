const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: Token missing' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed: Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
