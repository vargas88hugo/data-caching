const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const connectDB = require('./config/db');
const { PORT } = require('./config/keys');
const { cookiekey } = require('./config/keys');

require('./services/passport');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookiekey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));
app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
