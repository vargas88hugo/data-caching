const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:5000/api/current_user');
});

module.exports = router;
