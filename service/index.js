const { v4: uuidv4 } = require('uuid');
const db = require('../database');

const getTodos = (payload) =>
  new Promise((resolve) => {
    db.getTodos().then((result) => resolve(result.rows));
  });
const getTodoByID = (payload) =>
  new Promise((resolve, reject) => {
    const { id } = payload;
    db.getTodoByID(id).then((result) => resolve(result.rows[0]));
  });
const createTodo = (payload) =>
  new Promise((resolve, reject) => {
    const { content } = payload;
    const id = uuidv4();
    db.createTodo({ id, content, finished: 0 }).then((res) => resolve(res));
  });
const updateTodo = (payload) =>
  new Promise((resolve, reject) => {
    const { id } = payload;
    if (!id) reject(new Error('ID must be specified'));
    db.getTodoByID(id).then((res) => {
      const newTodo = { ...res, ...payload };
      db.updateTodo(newTodo).then((result) => resolve(result));
    });
  });
const deleteTodo = (payload) =>
  new Promise((resolve, reject) => {
    const { id } = payload;
    db.deleteTodo(id).then((res) => resolve(res));
  });

const service = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
module.exports = service;
