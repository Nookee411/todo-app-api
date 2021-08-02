const { Model } = require('objection');
const TodoTask = require('./TodoTask');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'uuid' },
        name: { type: 'string' },
        password: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      todos: {
        relation: Model.HasManyRelation,
        modelClass: TodoTask,
        join: {
          from: 'users.name',
          to: 'todos.user_id',
        },
      },
    };
  }
}

module.exports = {
  User,
};
