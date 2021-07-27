/* eslint-disable import/order */
const { Pool } = require('pg');
const { Model } = require('objection');
const KNEX_CONFIG = require('./config/knexConfig');
const POOL_CONFIG = require('./config/poolConfig');
const databaseActions = require('./DBActions');

const knex = require('knex')(KNEX_CONFIG);

const pool = new Pool(POOL_CONFIG);

module.exports = databaseActions(pool);
