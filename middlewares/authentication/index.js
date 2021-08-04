/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UserDAO } = require('../../database');

const authenticateToken = (req, res, next) => {
  const token = req.headers.bearer;
  if (token == null) {
    res.status(500).data = 'Access token not found';
    next();
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      res.status(403).data = 'Token invalid';
      next();
    }
    req.user = await UserDAO.getUserByID(user.id);
    next();
  });
};

module.exports = authenticateToken;
