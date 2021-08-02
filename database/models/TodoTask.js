const { Model } = require('objection');
const User = require('./User');

class TodoTask extends Model {
  static get tableName() {
    return 'todos';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['content'],
      properties: {
        id: {
          type: 'string',
        },
        content: { type: 'string', maxLength: 1000 },
        finished: { type: 'boolean' },
        user_id: { type: 'uuid' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'todos.user_id',
          to: 'users.name',
        },
      },
    };
  }
}

module.exports = {
  TodoTask,
};
