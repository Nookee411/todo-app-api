const express = require('express');
const { todoController } = require('../Controllers');
const authenticateToken = require('../middlewares/authentication');
const validate = require('../middlewares/validators');
const insertTodoValidator = require('../middlewares/validators/insertTodo');
const tokenValidator = require('../middlewares/validators/token');

const todoRouter = express.Router();

todoRouter.use(validate(tokenValidator), authenticateToken);

todoRouter.get('/', todoController.getTodos);
todoRouter.get('/:id', todoController.getTodoByID);
todoRouter.post('/', validate(insertTodoValidator), todoController.createTodo);
todoRouter.put('/', todoController.updateTodo);
todoRouter.delete('/', todoController.deleteTodo);

module.exports = todoRouter;
