const express = require('express');
const { todoProcessors } = require('./requestProcessors');

const todoRouter = express.Router();
todoRouter.get('/', todoProcessors.getTodos);
todoRouter.get('/:id', todoProcessors.getTodoByID);
todoRouter.post('/', todoProcessors.createTodo);
todoRouter.put('/', todoProcessors.updateTodo);
todoRouter.delete('/', todoProcessors.deleteTodo);

module.exports = todoRouter;
