const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const connectDB = require('./config/db');
const { PORT } = require('./config/keys');
const { cookiekey } = require('./config/keys');

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Home route');
});

app.use('/api/blogs', require('./routes/api/blogs'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
