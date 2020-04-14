const express = require('express');

const app = express();

app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));

app.listen(3000, () => console.log('express connected'));
