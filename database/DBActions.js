const databaseActions = (pool) => ({
  getTodos: () =>
    new Promise((resolve) => {
      pool.query('SELECT * FROM todos').then((result) => resolve(result));
    }),

  getTodoByID: (id) =>
    new Promise((resolve) => {
      pool
        .query('SELECT * FROM todos WHERE id = $1', [id])
        .then((result) => resolve(result));
    }),

  createTodo: (todo) =>
    new Promise((resolve) => {
      const { id, content, finished } = todo;
      pool
        .query(
          'INSERT INTO todos (id, content, finished) VALUES ($1, $2, $3)',
          [id, content, finished],
        )
        .then(() =>
          resolve({ message: `Todo with ID ${id} added to database `, id }),
        );
    }),

  updateTodo: (todo) =>
    new Promise((resolve) => {
      const { id, content, finished } = todo;
      pool
        .query('UPDATE todos SET content = $1, finished=$2 WHERE id = $3', [
          content,
          finished,
          id,
        ])
        .then(() =>
          resolve({ message: `Todo  with ID ${id} updated in database`, id }),
        );
    }),

  deleteTodo: (id) =>
    new Promise((resolve) => {
      pool
        .query('DELETE FROM users WHERE id=$1', [id])
        .then(() =>
          resolve({ message: `Todo  with ID ${id} deleted from database` }),
        );
    }),
});
module.exports = databaseActions;
