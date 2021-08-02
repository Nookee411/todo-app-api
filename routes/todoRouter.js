const express = require('express');
const { todoController } = require('./requestControllers');
const TodoDAO = require('../database/dao/TodoDAO');

const todoRouter = express.Router();
todoRouter.get('/', todoController.getTodos);
todoRouter.get('/:id', todoController.getTodoByID);
todoRouter.post('/', todoController.createTodo);
todoRouter.put('/', todoController.updateTodo);
todoRouter.delete('/', todoController.deleteTodo);

module.exports = todoRouter;
