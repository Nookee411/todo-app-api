/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UserDAO } = require('../../database');
const sendResponse = require('../../sendResponse');

const authenticateToken = (req, res, next) => {
  const token = req.headers.bearer;
  if (token == null) return sendResponse(res, 500, 'Access token not found');
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return sendResponse(res, 403, 'Token invalid');
    req.user = await UserDAO.getUserByID(user.id);
    next();
  });
};

module.exports = authenticateToken;
