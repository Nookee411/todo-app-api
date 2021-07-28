const { v4: uuidv4 } = require('uuid');
const db = require('../../database');

const getTodos = async (req, res) => {
  const todos = await db.getTodos();
  res.status(200).json(todos);
};

const getTodoByID = async ({ params: { id } }, res) => {
  const result = await db.getTodoByID(id);
  res.status(200).json(result);
};

const createTodo = async ({ query: { content } }, res) => {
  const result = await db.createTodo({ id: uuidv4(), content, finished: 0 });
  res.status(201).json(result);
};
const updateTodo = async ({ query: { id, ...data } }, res) => {
  const oldTodo = await db.getTodoByID(id);
  const result = await db.updateTodo({ ...oldTodo, ...data });
  res.status(200).json(result);
};

const deleteTodo = async ({ query: { id } }, res) => {
  const result = await db.deleteTodo(id);
  res.status(200).json(result);
};

const todoProcessors = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
module.exports = todoProcessors;
