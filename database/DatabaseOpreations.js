const databaseOperations = (pool) => ({
  getTodos: async () => {
    const res = await pool.query('SELECT * FROM todos');
    return res.rows;
  },

  getTodoByID: async (id) => {
    const res = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    return res.rows[0];
  },

  createTodo: ({ id, content, finished }) =>
    pool
      .query('INSERT INTO todos (id, content, finished) VALUES ($1, $2, $3)', [
        id,
        content,
        finished,
      ])
      .then(() => ({ message: 'Todo was added to database ', id })),

  updateTodo: ({ id, content, finished }) =>
    pool
      .query('UPDATE todos SET content = $1, finished=$2 WHERE id = $3', [
        content,
        finished,
        id,
      ])
      .then(() => ({ message: 'Todo was updated in database', id })),

  deleteTodo: (id) =>
    pool.query('DELETE FROM todos WHERE id=$1', [id]).then(() => ({
      message: 'Todo was deleted from database',
    })),
});
module.exports = databaseOperations;
