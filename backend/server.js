const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const connectDB = require('./config/db');
const passportInit = require('./services/passport');

const app = express();

connectDB();
passportInit();

app.use(express.json({ extended: false }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['secret-key'],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/blogs', require('./routes/api/blogs'));
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api/auth'));

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
