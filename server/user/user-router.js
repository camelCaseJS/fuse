const express = require('express');
const Friendship = require('../db/users/User-Friends');
const User = require('../db/users/User');
const userHandler = require('./user-route-handler');

const app = express();

app.get('/', (req, res) => {
  if (req.session.passport || process.env.NODE_ENV === 'test') {
    // console.log(req.user.id);
    Friendship.findAll({
      where: {
        userId: req.user.id,
        // userId: 1,
      },
    })
    .then(friends => friends.map(friend => {
      return {
        id: friend.friendId,
      };
    }))
    .then((friendIdArray) => {
      User.findAll({
        where: {
          $or: friendIdArray,
        },
        attributes: {
          exclude: ['email'],
        },
      })
      .then(friendsInfo => friendsInfo.map(friendInfo => friendInfo.dataValues))
      .then((friendInfoArray) => {
        res.send(friendInfoArray);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500)
      });
    });
  } else {
    console.log('no session');
    res.redirect('/auth/facebook');
  }
});

// From the client side, user would route to /users/:id, looping through an making multiple times

app.post('/', (req, res) => {
  // console.log(process.env.NODE_ENV);
  console.error('select a friend to add');
  res.redirect('/');
});

app.get('/:query', userHandler.userSearch);

app.post('/:id', (req, res) => {
  Friendship.findAll({
    where: {
      userId: req.params.id,
      friendId: req.user.id,
    },
  })
  .then((friend) => {
    if (friend.length !== 0) {
      Friendship.create({
        userId: req.user.id,
        friendId: req.params.id,
      })
      .then((id) => {
        console.log('friend created');
        res.send(id);
      })
      .catch((err) => {
        if (err && err.code === '2305') {
          res.sendStatus(201);
        } else {
          res.sendStatus(500);
        }
      });
    } else {
      console.error('Friend not found');
      res.sendStatus(404);
    }
  });
});


module.exports = app;
