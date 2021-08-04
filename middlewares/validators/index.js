const { checkSchema, validationResult } = require('express-validator');

const validate = (validator) => {
  const checkErrorsInValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).data = errors.array();
      next();
    }
    next();
  };
  return [checkSchema(validator), checkErrorsInValidation];
};

module.exports = validate;
