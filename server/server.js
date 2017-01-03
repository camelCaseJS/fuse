const app = require('./middleware/middleware');
const authRouter = require('./auth/auth-router');
const photoRouter = require('./photo/photo-router');
const userRouter = require('./user/user-router');

const PORT = 8000;

app.use('/auth', authRouter);
app.use('/photo', photoRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  console.log('get request at /');
  if (req.user) {
  }
  res.send('index');
});

app.get('/profile', (req, res) => {
  console.log('get request at /profile');
  res.send('profile');
});

app.listen(PORT);

console.log(`Server up and listening to port ${PORT}`);
