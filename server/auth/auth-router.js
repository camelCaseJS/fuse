const express = require('express');
const passport = require('./passport');

const app = express();

app.get('/logout', (req, res) => {
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
    failureRedirect: '/login' }));


app.post('/facebook/token',
  passport.authenticate('facebook-token'), (req, res) => {
    // do something with req.user
    res.sendStatus(req.user ? 200 : 401);
  },
);

module.exports = app;
