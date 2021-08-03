const { checkSchema, validationResult } = require('express-validator');

const validate = (validator) => {
  const checkErrorsInValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  return [checkSchema(validator), checkErrorsInValidation];
};

module.exports = validate;
