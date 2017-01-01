import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import passport from './auth/passport';

const PORT = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  console.log('get request at /');
  res.send('index');
});

app.get('/profile', (req, res) => {
  console.log('get request at /profile');
  res.send('profile');
});

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' }), (req, res) => {
    console.log(`auth success with ${req.user}`);
  });

// app.get('/auth/facebook/callback', (req, res) => {
//   res.send('callback');
// });
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
    failureRedirect: '/profile' }));

app.listen(PORT);

console.log(`Server up and listening to port ${PORT}`);
