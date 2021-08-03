const isEmpty = require('lodash/isEmpty');
const { TodoDAO, UserDAO } = require('../../database');

const getTodos = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    res.sendStatus(400);
  }
  const todos = await TodoDAO.getTodos(id);
  res.status(200).json(todos);
};

const getTodoByID = async ({ body: { id }, user: { id: userID } }, res) => {
  const result = await TodoDAO.getTodoByID(id);
  if (result.user_id !== userID) res.sendStatus(403);
  res.status(200).json(result);
};

const createTodo = async ({ body: { content }, user: { id } }, res) => {
  try {
    if (!content.length) {
      res.sendStatus(400);
    }
    const result = await TodoDAO.createTodo({
      content,
      user_id: id,
      finished: false,
    });
    res.status(201).json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};
const updateTodo = async (
  { body: { id, todo }, user: { id: userID } },
  res,
) => {
  if (isEmpty(todo)) {
    res.sendStatus(400);
    return;
  }
  const oldTodo = await TodoDAO.getTodoByID(id);

  if (!oldTodo) {
    res.sendStatus(404);
    return;
  }
  if (oldTodo.user_id !== userID) {
    res.sendStatus(403);
    return;
  }
  await TodoDAO.updateTodo({
    ...oldTodo,
    ...todo,
  });
  res.sendStatus(200);
};

const deleteTodo = async ({ body, user: { id: userID } }, res) => {
  const { id } = body;
  const todo = await TodoDAO.getTodoByID(id);
  if (todo.user_id !== userID) res.sendStatus(403);
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
