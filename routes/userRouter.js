const express = require('express');
const { session } = require('passport');
const passport = require('passport');
const { userController } = require('./requestControllers');

const userRouter = express.Router();

userRouter.post('/signup', userController.registerUser);
userRouter.post(
  '/signin',
  passport.authenticate('local'),
  userController.signinUser,
);

module.exports = userRouter;
