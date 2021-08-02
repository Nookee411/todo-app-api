const { TodoTask } = require('../models/TodoTask');

const TodoDAO = {
  getTodos: (id) =>
    TodoTask.query().where('user_id', id).orderBy('added_date', 'desc'),

  getTodoByID: async (id) => TodoTask.query().findById(id),

  createTodo: async (todo) => {
    await TodoTask.query().insert(todo);
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
};

module.exports = TodoDAO;
