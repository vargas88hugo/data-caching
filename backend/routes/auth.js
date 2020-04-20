const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:5000/api/current_user');
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

module.exports = router;
