const todoRouter = require('./todoRouter.js');
const userRouter = require('./userRouter.js');

const defineRoutes = (app) => {
  app.use('/todos', todoRouter);
  app.use('/user', userRouter);
};

module.exports = defineRoutes;
