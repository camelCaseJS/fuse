const express = require('express');
const Friendship = require('../db/users/User-Friends');
const User = require('../db/users/User');

const app = express();

app.get('/', (req, res) => {
  // console.log(req.session);
  if (req.session.passport) {
    console.log(req.session.passport.user);
    User.findOne({
      where: {
        id: req.session.passport.user,
      }
      .then((user) => {
        Friendship.findAll({
          where: {
            id: user.id,
          },
        })
        .then((friends) => {
          res.json(friends);
        });
      }),
    // res.send();
    });
  } else {
    res.redirect('/');
  }
});

// From the client side, user would route to /users/:id, looping through an making multiple times

app.post('/', (req, res) => {
  console.log(process.env.NODE_ENV);
  console.error('select a friend to add');
  res.redirect('/');
});

app.post('/:id', (req, res) => {
  Friendship.findOne({
    where: {
      id: req.params.id,
    },
  })
  .then((friend) => {
    if (friend.length !== 0) {
      Friendship.create({
        userId: req.session.passport.user,
        friendId: req.params.id,
      })
      .then((id) => {
        console.log('friend created');
        res.send(id);
      });
    } else {
      console.error('Friend not found');
      res.redirect('/');
    }
  });
});

module.exports = app;
