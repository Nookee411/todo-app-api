const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'todoappdb',
  password: 'password',
  port: 5432,
});

const todoRouter = express.Router();
todoRouter.get('/', (req, res) => {});
todoRouter.get('/:id', (req, res) => {});
todoRouter.post('/', (req, res) => {});
todoRouter.put('/', (req, res) => {});
todoRouter.delete('/', (req, res) => {});

module.exports = todoRouter;
