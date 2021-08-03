/* eslint-disable nonblock-statement-body-position */
/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const isEmpty = require('lodash/isEmpty');
const { TodoDAO, UserDAO } = require('../database');
const sendResponse = require('../sendResponse');

const getTodos = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    sendResponse(res, 400, 'Id not found');
  }
  const todos = await TodoDAO.getTodos(id);
  sendResponse(res, 200, todos);
};

const getTodoByID = async ({ body: { id }, user: { id: userID } }, res) => {
  const result = await TodoDAO.getTodoByID(id);
  if (result.user_id !== userID) {
    sendResponse(res, 403, "Item doesn't match with user");
  }
  sendResponse(res, 200, result);
};

const createTodo = async ({ user: { id }, body: { content } }, res) => {
  const result = await TodoDAO.createTodo({
    content,
    user_id: id,
    finished: false,
  });
  sendResponse(res, 201, result);
};
const updateTodo = async (
  { body: { id, todo }, user: { id: userID } },
  res,
) => {
  if (isEmpty(todo)) {
    sendResponse(res, 400);
    return;
  }
  const oldTodo = await TodoDAO.getTodoByID(id);

  if (!oldTodo) {
    sendResponse(res, 404, 'No such todo found');
    return;
  }
  if (oldTodo.user_id !== userID) {
    sendResponse(res, 403, "Todo doesn't match with user");
    return;
  }
  await TodoDAO.updateTodo({
    ...oldTodo,
    ...todo,
  });
  sendResponse(res, 200);
};

const deleteTodo = async ({ body, user: { id: userID } }, res) => {
  const { id } = body;
  const todo = await TodoDAO.getTodoByID(id);
  if (todo.user_id !== userID) {
    sendResponse(res, 403, "Todo doesn't belong  to user");
  }
  await TodoDAO.deleteTodo(id);
  sendResponse(res, 200);
};

const todoController = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
module.exports = todoController;
