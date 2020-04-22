const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT;

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, autherization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded.user;

    next();
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
