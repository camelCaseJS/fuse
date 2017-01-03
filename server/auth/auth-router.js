import express from 'express';
import passport from './passport';

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.get('/facebook',
  passport.authenticate('facebook', { scope: 'email' }), (req, res) => {
  });

app.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/profile' }));

export default app;
