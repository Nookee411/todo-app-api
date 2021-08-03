const { checkSchema, validationResult } = require('express-validator');
const sendResponse = require('../../sendResponse');

const validate = (validator) => {
  const checkErrorsInValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, errors.array());
    }
    next();
  };
  return [checkSchema(validator), checkErrorsInValidation];
};

module.exports = validate;
