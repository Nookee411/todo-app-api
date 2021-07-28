exports.up = (knex) =>
  knex.schema.createTable('todos', (table) => {
    table.string('id').primary();
    table.string('content');
    table.boolean('finished');
  });
exports.down = (knex) => knex.schema.dropTableIfExists('todos');
