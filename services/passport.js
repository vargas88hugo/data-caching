const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const { idGoogle, secretGoogle } = require('../config/keys');
const User = require('../models/User');

/**
 * In this step we serialize the mongo user
 * to a token for setting a cookie
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new Strategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: idGoogle,
      clientSecret: secretGoogle,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }
        const newUser = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
        }).save();
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
