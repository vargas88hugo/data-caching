const express = require('express');
const connectDB = require('./config/db');
const { PORT } = require('./config/keys');

const app = express();

connectDB();

app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
