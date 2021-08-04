const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const defineRoutes = require('./routes/index.js');
const initPassport = require('./passport.config.js');
const formResponse = require('./middlewares/response');
const errorHandler = require('./errorHandler');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(passport.initialize());
initPassport(passport);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

defineRoutes(app);
app.use(errorHandler);
app.use(formResponse);

app.listen(PORT, () => {
  console.log(`App is running on  http:\\\\localhost:${PORT}`);
});
