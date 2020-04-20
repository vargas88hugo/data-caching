const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

new User({ googleId: '12345' });

const passportInit = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );
};

module.exports = passportInit;
