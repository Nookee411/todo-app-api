const databaseOperations = (db) => ({
  getTodos: () => db.select().from('todos'),

  getTodoByID: async (id) => {
    const res = await db.select().from('todos').where('id', id);
    return res[0];
  },

  createTodo: async (todo) => {
    await db('todos').insert(todo);
    return { message: 'Todo was created in database todos', id: todo.id };
  },

  updateTodo: async ({ id, content, finished }) => {
    await db('todos').update({ content, finished }).where('id', id);

    return { message: 'Todo was updated in database todos' };
  },

  deleteTodo: async (id) => {
    await db('todos').where('id', id).del();
    return { message: 'Todo was deleted from database' };
  },
});

module.exports = databaseOperations;
