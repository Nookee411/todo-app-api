const express = require('express');
const passport = require('passport');
const { userController } = require('../Controllers');
const authenticateToken = require('../middlewares/authentication');
const validate = require('../middlewares/validators');
const tokenValidator = require('../middlewares/validators/token');

const userRouter = express.Router();

userRouter.post('/signup', userController.registerUser);
userRouter.post(
  '/restore',
  validate(tokenValidator),
  authenticateToken,
  userController.restoreUser,
);
userRouter.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  userController.signinUser,
);
userRouter.get('/check', userController.checkUsername);

module.exports = userRouter;
