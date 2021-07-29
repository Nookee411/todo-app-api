const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const defineRoutes = require('./routes/index.js');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

defineRoutes(app);

app.listen(PORT, () => {
  console.log(`App is running on  http:\\\\localhost:${PORT}`);
});
