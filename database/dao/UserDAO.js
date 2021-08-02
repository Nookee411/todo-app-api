const { User } = require('../models/User');

const UserDAO = {
  addUser: async (user) => {
    await User.query().insert(user);
  },
  getUserByName: (name) => User.query().findOne('name', '=', name),
  getUserByID: (id) => User.query().findById(id),
};

module.exports = UserDAO;
