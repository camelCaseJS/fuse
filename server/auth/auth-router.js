const express = require('express');
const passport = require('./passport');

const app = express();

app.get('/logout', (req, res) => {
  console.log(req.user.name);
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.get('/facebook',
  passport.authenticate('facebook', { scope: 'email' }), (req, res) => {
  });

app.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/profile' }));

module.exports = app;
