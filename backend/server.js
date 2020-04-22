const express = require('express');

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Home');
});
app.use('/api/blogs', require('./routes/api/blogs'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
