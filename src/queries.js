const { Pool } = require('pg');

const { v4: uuidv4 } = require('uuid');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'todoappdb',
  password: 'password',
  port: 5432,
});

const displayHome = () => {};
const getTodos = (req, res) => {
  pool.query('SELECT * FROM todos', (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const getTodoByID = (req, res) => {
  const id = parseInt(req.params.id, 10);
  pool.query('SELECT * FROM todos WHERE id = $1', [id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const createTodo = (req, res) => {
  const { content } = req.body;
  const id = uuidv4();
  pool.query(
    'INSERT INTO todos (id, content, finished) VALUES ($1, $2, $3)',
    [id, content, 0],
    (err) => {
      if (err) throw err;
      res.status(201).send(`Todo added with ID: ${id}`);
    },
  );
};
const updateTodo = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { content, finished } = req.body;
  pool.query(
    'UPDATE todos SET content = $1, finished=$2 WHERE id = $3',
    [content, finished, id],
    (err) => {
      if (err) throw err;
      res.status(200).send(`Todo modified with ID: ${id}`);
    },
  );
};
const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id, 10);
  pool.query('DELETE FROM users WHERE id=$1', [id], (err) => {
    if (err) throw err;
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  displayHome,
  getTodoByID,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
