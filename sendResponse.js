const sendResponse = (res, code = 200, data = {}) => {
  const jsonResponse = {
    success: code < 400,
  };
  if (code < 400) {
    jsonResponse.data = data;
  } else {
    jsonResponse.error = data;
  }
  res.status(code).json(jsonResponse);
};

module.exports = sendResponse;
