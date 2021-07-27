const express = require('express');

const { v4: uuidv4 } = require('uuid');

const bodyParser = require('body-parser');

const db = require('./queries');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (request, response) => {
  response.json({ info: uuidv4() });
});

app.get('/todos', db.getTodos);
app.get('/todos/:id', db.getTodoByID);
app.post('/todos', db.createTodo);
app.put('/todos/:id', db.updateTodo);
app.delete('/todos/:id', db.deleteTodo);

app.listen(PORT, () => {
  console.log(`App is running on  http:\\\\localhost:${PORT}`);
});
