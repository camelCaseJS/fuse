const express = require('express');
const Friendship = require('../db/users/User-Friends');
const User = require('../db/users/User');

const app = express();

app.get('/', (req, res) => {
  // console.log(req.session);
  if (req.session.passport || process.env.NODE_ENV === 'test') {
    // console.log(req.session.passport.user);
    User.findOne({
      where: {
        facebookId: req.session.passport.user.facebookId,
      },
    })
    .then((user) => {
      if (!user) {
        console.log('YOU AINT GOT NO FRIENDS T_T');
        res.redirect('/');
      } else {
        console.log(user, '==================user');
        Friendship.findAll({
          where: {
            userId: user.id,
          },
        })
        .then((friendsIds) => {
          console.log(friendsIds, 'friends');
          res.json('hello');
        });
      }
    });
    // res.send();
  } else {
    console.log('no session bruh');
    res.redirect('/auth/facebook');
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
