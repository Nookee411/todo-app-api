/* eslint-disable nonblock-statement-body-position */
const { TodoDAO } = require('../database');

const getTodos = async (req, res, next) => {
  const { id } = req.user;
  if (!id) {
    res.status(400);
    next();
  }
  const todos = await TodoDAO.getTodos(id);
  res.status(200).data = todos;
  next();
};

const getTodoByID = async (
  { body: { id }, user: { id: userID } },
  res,
  next,
) => {
  const result = await TodoDAO.getTodoByID(id);
  if (result.user_id !== userID) {
    res.status(403).data = "Item doesn't match with user";
    next();
  }
  res.status(200).data = result;
  next();
};

const createTodo = async ({ user: { id }, body: { content } }, res, next) => {
  const result = await TodoDAO.createTodo({
    content,
    user_id: id,
    finished: false,
  });
  res.status(201).data = result;
  next();
};
const updateTodo = async (
  { body: { id, todo }, user: { id: userID } },
  res,
  next,
) => {
  const oldTodo = await TodoDAO.getTodoByID(id);

  if (!oldTodo) {
    res.status(404).data = 'No such todo found';
    next();
  }
  if (oldTodo.user_id !== userID) {
    res.status(403).data = "Todo doesn't match with user";
    next();
  }
  await TodoDAO.updateTodo({
    ...oldTodo,
    ...todo,
  });
  res.status(200);
  next();
};

const deleteTodo = async ({ body, user: { id: userID } }, res, next) => {
  const { id } = body;
  const todo = await TodoDAO.getTodoByID(id);
  if (todo.user_id !== userID) {
    res.status(403).data("Todo doesn't belong  to user");
    next();
  }
  await TodoDAO.deleteTodo(id);
  res.status(200);
  next();
};

const todoController = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
module.exports = todoController;
