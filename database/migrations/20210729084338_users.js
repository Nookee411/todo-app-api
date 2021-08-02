exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').unique();
    table.string('password').notNullable();
  });
  await knex.schema.alterTable('todos', (table) => {
    table.uuid('user_id');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('todos', (table) => {
    table.dropColumn('user_id');
  });
  await knex.schema.dropTableIfExists('users');
};
