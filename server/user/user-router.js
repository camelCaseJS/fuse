const express = require('express');
const userHandler = require('./user-route-handler');

const app = express();

app.get('/', userHandler.getUserFriends);

// From the client side, user would route to /users/:id, looping through multiple times

app.post('/', (req, res) => {
  // console.log(process.env.NODE_ENV);
  console.error('select a friend to add');
  res.redirect('/');
});

app.get('/userInfo', userHandler.getUserInfo);

app.get('/search/:query?', userHandler.userSearch);

app.get('/pending', userHandler.getPendingFriends);

app.post('/:id', userHandler.addFriendRequest);


module.exports = app;
