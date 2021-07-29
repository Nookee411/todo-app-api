exports.up = (knex) =>
  knex.schema.alterTable('todos', (table) => {
    table.dateTime('added_date').defaultTo(knex.fn.now());
  });

exports.down = (knex) =>
  knex.schema.alterTable('todos', (table) => {
    table.dateTime('added_date').del();
  });
