const { Model } = require('objection');

class TodoTask extends Model {
  static get tableName() {
    return 'todos';
  }
}

module.exports = {
  TodoTask,
};
