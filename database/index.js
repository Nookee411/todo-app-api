/* eslint-disable import/order */
const { Model } = require('objection');
const knexfile = require('./knexfile');
const TodoDAO = require('./dao/TodoDAO');
const UserDAO = require('./dao/UserDAO');

const db = require('knex')(knexfile.development);

Model.knex(db);

const databaseOperations = {
  TodoDAO,
  UserDAO,
};
module.exports = databaseOperations;
