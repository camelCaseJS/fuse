const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const authRouter = require('./auth/auth-router');
const photoRouter = require('./photo/photo-router');
const userRouter = require('./user/user-router');

const PORT = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.get('/', (req, res) => {
  console.log('get request at /');
  if (req.user) {
    console.log('req.user', req.user.name);
  }
  res.send('index');
});

app.get('/profile', (req, res) => {
  console.log('get request at /profile');
  if(req.user) {
    console.log(req.user.name);
  }
  res.send('profile');
});

app.use('/auth', authRouter);
app.use('/photo', photoRouter);
app.use('/user', userRouter);

app.listen(PORT);

console.log(`Server up and listening to port ${PORT}`);
