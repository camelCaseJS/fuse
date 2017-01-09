const path = require('path');
const app = require('./middleware/middleware');
const authRouter = require('./auth/auth-router');
const photoRouter = require('./photo/photo-router');
const userRouter = require('./user/user-router');
const isAuthenticated = require('./auth/is-authenticated');

const PORT = 8000;

// API routes
app.use('/auth', authRouter);
app.use('/photo', isAuthenticated, photoRouter);
app.use('/user', isAuthenticated, userRouter);

// Serve up webpack bundle
app.get('/dist/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'bundle.js'));
});
app.get('/styles/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/styles', 'styles.css'));
});

// Requests to index will be authenticated
  // If authenitcated, user sent to landing page, /friends
  // If not authenitcated, controller routes to login
app.get('/', isAuthenticated, (req, res) => {
  res.redirect('/friends');
});

// Login path doesn't require authentication
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// React router paths directed to index.html
const reactRouterPaths = ['/friends', '/photos', '/camera'];

app.get(reactRouterPaths, isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(PORT);

console.log(`Server up and listening to port ${PORT}`);
