exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('name').unique();
    table.string('password').notNullable();
  });
  await knex.schema.alterTable('todos', (table) => {
    table.string('userID');
    table.foreign('userID').references('users.id');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('todos', (table) => {
    table.dropColumn('userID');
  });
  await knex.schema.dropTableIfExists('users');
};
