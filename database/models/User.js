const { Model } = require('objection');

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
      required: ['id'],
      properties: {
        id: {
          type: 'string',
        },
        name: { type: 'string' },
        password: { type: 'string' },
      },
    };
  }
}

module.exports = {
  User,
};
