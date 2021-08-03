const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserDAO } = require('../../database');
const db = require('../../database');

const registerUser = async ({ body: { login, password } }, res) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserDAO.addUser({
    name: login,
    password: hashedPassword,
  });
  res.sendStatus(201);
};

const signinUser = async ({ body: { login } }, res) => {
  const user = await db.UserDAO.getUserByName(login);
  const accessToken = jwt.sign(
    JSON.stringify(user),
    process.env.ACCESS_TOKEN_SECRET,
  );
  res
    .status(200)
    .json({ user: { name: user.name, id: user.id, token: accessToken } });
};

const userController = {
  registerUser,
  signinUser,
};
module.exports = userController;
