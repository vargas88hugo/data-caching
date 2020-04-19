const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const User = require('../models/User');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//     console.log('hi');
//   });
// });

new User({ googleId: '12345' });

const passportInit = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({
          googleId: profile.id,
        });

        if (user) {
          done(null, user);
        } else {
          const newUser = new User({ googleId: profile.id });

          await newUser.save();

          done(null, user);
        }
      }
    )
  );
};

module.exports = passportInit;
