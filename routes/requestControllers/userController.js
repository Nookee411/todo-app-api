const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { UserDAO } = require('../../database');
const db = require('../../database');

const registerUser = async ({ body: { login, password } }, res) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserDAO.addUser({
    id: uuidv4(),
    name: login,
    password: hashedPassword,
  });
  res.status(201).send();
};

const signinUser = async ({ body: { login } }, res) => {
  res.status(200).json(await db.UserDAO.getUserByName(login));
};

const userController = {
  registerUser,
  signinUser,
};
module.exports = userController;
