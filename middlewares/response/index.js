const formResponse = (req, res, next) => {
  res.json({ success: res.statusCode < 400, data: res.data });
};

module.exports = formResponse;
