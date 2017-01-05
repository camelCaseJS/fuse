const path = require('path');
const app = require('./middleware/middleware');
const authRouter = require('./auth/auth-router');
const photoRouter = require('./photo/photo-router');
const userRouter = require('./user/user-router');

const PORT = 8000;

app.use('/auth', authRouter);
app.use('/photo', photoRouter);
app.use('/user', userRouter);

app.get('/dist/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'bundle.js'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(PORT);

console.log(`Server up and listening to port ${PORT}`);
