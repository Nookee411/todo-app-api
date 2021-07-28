const service = require('../../service');

const getTodos = (req, res) => {
  service.getTodos().then((result) => res.status(200).json(result));
};

const getTodoByID = (req, res) => {
  console.log(req.params);
  service
    .getTodoByID(req.params)
    .then((result) => res.status(200).json(result));
};

const createTodo = (req, res) => {
  service.createTodo(req.params).then((result) => {
    res.status(200).json(result);
  });
};
const updateTodo = (req, res) => {
  service.updateTodo(req.params).then((result) => {
    res.status(200).json(result);
  });
};

const deleteTodo = (req, res) => {
  service.deleteTodo(req.params).then((result) => {
    res.status(200).json(result);
  });
};
const todoProcessors = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
module.exports = todoProcessors;
