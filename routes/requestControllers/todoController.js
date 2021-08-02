const { v4: uuidv4 } = require('uuid');
const isEmpty = require('lodash/isEmpty');
const { TodoDAO } = require('../../database');
const { upperFirst } = require('lodash');

const getTodos = async ({ query: { username } }, res) => {
  const todos = await TodoDAO.getTodos(username);
  res.status(200).json(todos);
};

const getTodoByID = async ({ params: { id } }, res) => {
  const result = await TodoDAO.getTodoByID(id);
  res.status(200).json(result);
};

const createTodo = async ({ body: { content, userID } }, res) => {
  // try {
  if (!content.length) {
    res.sendStatus(400);
  }
  const result = await TodoDAO.createTodo({
    content,
    user_id: userID,
    finished: false,
  });
  res.status(201).json(result);
  // } catch (err) {
  //   res.sendStatus(500);
  // }
};
const updateTodo = async ({ body: { id, todo } }, res) => {
  if (isEmpty(todo)) {
    res.sendStatus(400);
    return;
  }
  if (!todo.content || !todo.content.length) {
    res.sendStatus(400);
    return;
  }
  const oldTodo = await TodoDAO.getTodoByID(id);
  if (!oldTodo) {
    res.sendStatus(404);
    return;
  }
  await TodoDAO.updateTodo({
    ...oldTodo,
    ...todo,
  });
  res.sendStatus(200);
};

const deleteTodo = async ({ body }, res) => {
  const { id } = body;
  await TodoDAO.deleteTodo(id);
  res.sendStatus(200);
};

const todoController = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
module.exports = todoController;
