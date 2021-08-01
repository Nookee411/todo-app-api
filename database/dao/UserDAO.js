const { User } = require('../models/User');

const UserDAO = {
  addUser: async (user) => {
    await User.query().insert(user);
  },
  getUserById: (id) => {
    User.query().findById(id);
  },
  getUserByName: (name) => User.query().findOne('name', name),
};

module.exports = UserDAO;
