const path = require('path');
const app = require('./middleware/middleware');
const authRouter = require('./auth/auth-router');
const photoRouter = require('./photo/photo-router');
const userRouter = require('./user/user-router');
const isAuthenticated = require('./auth/is-authenticated');

// API routes
app.use('/api/auth', authRouter);
app.use('/api/photos', isAuthenticated, photoRouter);
app.use('/api/users', isAuthenticated, userRouter);

// Serve up webpack bundle
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'bundle.js'));
});
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/resources', 'styles.css'));
});

// Requests to index will be authenticated
  // If authenitcated, user sent to landing page, /friends
  // If not authenitcated, controller routes to login
app.get('/', isAuthenticated, (req, res) => {
  res.redirect('/friends');
});

// Login path doesn't require authentication
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/resources', 'index.html'));
});

// React router paths directed to index.html
const reactRouterPaths = ['/friends', '/search', '/photos', '/camera'];

app.get(reactRouterPaths, isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/resources', 'index.html'));
});

app.listen(process.env.WEB_SERVER_PORT);

console.log(`Server up and listening to port ${process.env.WEB_SERVER_PORT}`);
