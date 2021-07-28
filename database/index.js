/* eslint-disable import/order */
const { Pool } = require('pg');
const { Model } = require('objection');
const KNEX_CONFIG = require('./config/knexConfig');
const POOL_CONFIG = require('./config/poolConfig');
const databaseOperations = require('./DatabaseOpreations');

const knex = require('knex')(KNEX_CONFIG);

const pool = new Pool(POOL_CONFIG);

module.exports = databaseOperations(pool);
