const express = require('express');
const { checkSchema } = require('express-validator');
const { todoController } = require('../Controllers');
const authenticateToken = require('../middlewares/authentication');
const validate = require('../middlewares/validators');
const insertTodoValidator = require('../middlewares/validators/insertTodo');

const todoRouter = express.Router();
todoRouter.get(
  '/',
  authenticateToken,

  todoController.getTodos,
);
todoRouter.get('/:id', authenticateToken, todoController.getTodoByID);
todoRouter.post(
  '/',
  authenticateToken,
  validate(insertTodoValidator),
  todoController.createTodo,
);
todoRouter.put('/', authenticateToken, todoController.updateTodo);
todoRouter.delete('/', authenticateToken, todoController.deleteTodo);

module.exports = todoRouter;
