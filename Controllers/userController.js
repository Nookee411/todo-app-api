const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserDAO } = require('../database');
const db = require('../database');

const registerUser = async ({ body: { login, password } }, res, next) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserDAO.addUser({
    name: login,
    password: hashedPassword,
  });
  res.status(201);
  next();
};

const signinUser = async ({ body: { login } }, res, next) => {
  const user = await db.UserDAO.getUserByName(login);
  const accessToken = jwt.sign(
    JSON.stringify(user),
    process.env.ACCESS_TOKEN_SECRET,
  );
  res.status(200).data = {
    user: { name: user.name, id: user.id, token: accessToken },
  };
  next();
};

const restoreUser = async (req, res, next) => {
  res.status(200).data = { user: { id: req.user.id, name: req.user.name } };
  next();
};

const userController = {
  registerUser,
  signinUser,
  restoreUser,
};
module.exports = userController;
