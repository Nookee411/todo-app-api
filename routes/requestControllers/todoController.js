const { v4: uuidv4 } = require('uuid');
const isEmpty = require('lodash/isEmpty');
const { TodoDAO } = require('../../database');

const badRequest = {
  message: 'Bad request',
};

const getTodos = async ({ query }, res) => {
  const todos = await TodoDAO.getTodos(query.userID);
  res.status(200).json(todos);
};

const getTodoByID = async ({ params: { id } }, res) => {
  const result = await TodoDAO.getTodoByID(id);
  res.status(200).json(result);
};

const createTodo = async ({ body }, res) => {
  try {
    if (!body.content.length) {
      res.status(400).json(badRequest);
    }
    const result = await TodoDAO.createTodo({
      id: uuidv4(),
      ...body,
      finished: false,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};
const updateTodo = async ({ body }, res) => {
  const { id, todo } = body;
  const oldTodo = await TodoDAO.getTodoByID(id);
  if (!oldTodo) {
    res.status(404).json('No such id found');
    return;
  }
  if (isEmpty(todo)) {
    res.status(400).json(badRequest);
    return;
  }
  const result = await TodoDAO.updateTodo({
    ...oldTodo,
    ...todo,
  });
  res.status(200).json(result);
};

const deleteTodo = async ({ body }, res) => {
  const { id } = body;
  const result = await TodoDAO.deleteTodo(id);
  res.status(200).json(result);
};

const todoController = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
module.exports = todoController;
