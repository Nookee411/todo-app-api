exports.up = async (knex) => {
  await knex.schema.alterTable('todos', (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .alter();
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('todos', (table) => {
    table.dropPrimary();
    table.string('id').primary().alter();
  });
};
