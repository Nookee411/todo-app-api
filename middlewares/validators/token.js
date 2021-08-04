const tokenValidator = {
  Bearer: {
    in: ['headers'],
    isString: {
      errorMessage: 'Content must not be empty',
      options: {
        min: 1,
      },
    },
  },
};

module.exports = tokenValidator;
