import express from 'express';
import passport from './passport';

const app = express();

app.use(passport.initialize());
app.use(passport.session());

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
    failureRedirect: '/profile' }));

export default app;
