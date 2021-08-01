const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { UserDAO } = require('./database');

const authUser = async (username, password, done) => {
  try {
    const user = await UserDAO.getUserByName(username);
    if (!user) return done(null, false, 'No such username');
    if (await bcrypt.compare(password, user.password)) return done(null, user);
    console.log(username, password);
  } catch (e) {
    return done(e, false);
  }
  return done(null, false);
};

const initPassport = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'login' }, authUser));
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
};

module.exports = initPassport;
