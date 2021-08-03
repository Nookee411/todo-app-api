const express = require('express');
const { todoController } = require('./requestControllers');
const authenticateToken = require('./authentication');

const todoRouter = express.Router();
todoRouter.get('/', authenticateToken, todoController.getTodos);
todoRouter.get('/:id', authenticateToken, todoController.getTodoByID);
todoRouter.post('/', authenticateToken, todoController.createTodo);
todoRouter.put('/', authenticateToken, todoController.updateTodo);
todoRouter.delete('/', authenticateToken, todoController.deleteTodo);

module.exports = todoRouter;
