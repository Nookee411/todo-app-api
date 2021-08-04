const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).data = err;
  next();
};

module.exports = errorHandler;
