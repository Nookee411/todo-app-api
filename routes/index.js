const todoRouter = require('./todoRouter.js');

const defineRoutes = (app) => {
  app.use('/todos', todoRouter);
};

module.exports = defineRoutes;
