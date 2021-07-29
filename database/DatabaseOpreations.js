const { TodoTask } = require('./models/TodoTask');

const databaseOperations = (db) => ({
  getTodos: () => TodoTask.query().orderBy('added_date', 'desc'),

  getTodoByID: async (id) => TodoTask.query().findById(id),

  createTodo: async (todo) => {
    await TodoTask.query().insert({
      ...todo,
    });
    // await db('todos').insert(todo);
    return { message: 'Todo was created in database todos', id: todo.id };
  },

  updateTodo: async ({ id, ...data }) => {
    await TodoTask.query()
      .findById(id)
      .patch({ ...data });

    return { message: 'Todo was updated in database todos' };
  },

  deleteTodo: async (id) => {
    await TodoTask.query().deleteById(id);
    return { message: 'Todo was deleted from database' };
  },
});

module.exports = databaseOperations;
