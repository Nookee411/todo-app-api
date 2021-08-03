const insertTodoValidator = {
  content: {
    in: ['body'],
    isString: {
      errorMessage: 'Content must not be empty',
      options: {
        min: 1,
      },
    },
  },
};

module.exports = insertTodoValidator;
