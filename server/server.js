import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';

import authRouter from './auth/auth-router';
import photoRouter from './photo/photo-router';
import userRouter from './user/user-router';

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
  res.send('profile');
});

app.use('/auth', authRouter);
app.use('/photo', photoRouter);
app.use('/user', userRouter);

app.listen(PORT);

console.log(`Server up and listening to port ${PORT}`);
