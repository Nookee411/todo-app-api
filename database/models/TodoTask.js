const { Model } = require('objection');

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
      required: ['id'],
      properties: {
        id: {
          type: 'string',
        },
        content: { type: 'string', maxLength: 1000 },
        finished: { type: 'boolean' },
      },
    };
  }
}

module.exports = {
  TodoTask,
};
