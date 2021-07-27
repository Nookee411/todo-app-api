const KNEX_CONFIG = {
  client: 'pg',
  connection: {
    host: '127.0.0.0.1',
    user: 'me',
    password: 'password',
    database: 'todoappdb',
  },
};

module.exports = KNEX_CONFIG;
