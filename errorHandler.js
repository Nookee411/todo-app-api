const sendResponse = require('./sendResponse');

const errorHandler = (err, req, res, next) => {
  console.error(err);
  return sendResponse(res, 500);
};

module.exports = errorHandler;
