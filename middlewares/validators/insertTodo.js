const insertTodoValidator = {
  content: {
    in: ['body'],
    isInt: {
      errorMessage: 'Content must not be empty',
      options: {
        min: 1,
      },
    },
  },
};

module.exports = insertTodoValidator;
