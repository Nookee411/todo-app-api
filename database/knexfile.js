const knexfile = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'me',
      password: 'password',
      database: 'todoappdb',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = knexfile;
