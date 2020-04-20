const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Blogs route');
});

module.exports = router;
