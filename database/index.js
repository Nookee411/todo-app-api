/* eslint-disable import/order */
const { Model } = require('objection');
const knexfile = require('./knexfile');
const databaseOperations = require('./DatabaseOpreations');

const db = require('knex')(knexfile.development);

Model.knex(db);

// const pool = new Pool(POOL_CONFIG);

module.exports = databaseOperations(db);
