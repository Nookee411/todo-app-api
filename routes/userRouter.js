const express = require('express');
const passport = require('passport');
const { userController } = require('./requestControllers');

const userRouter = express.Router();

userRouter.post('/signup', userController.registerUser);
userRouter.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  userController.signinUser,
);

module.exports = userRouter;
