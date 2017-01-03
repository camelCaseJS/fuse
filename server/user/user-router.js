const express = require('express');
const Friendship = require('../db/users/User-Friends');
const User = require('../db/users/User');

const app = express();

app.get('/users', (req, res) => {
  User.findOne({
    where: {
      facebookId: req.session.passport.user,
    }
    .then((userId) => {
      Friendship.findAll({
        where: {
          id: userId,
        },
      })
      .then((friends) => {
        res.json(friends);
      });
    }),
  // res.send();
  });
});

// post req should take in id of friend the user wants to add. :id in route is friend's id

app.post('/users/:id', (req, res) => {
  Friendship.create({
    userId: req.session.passport.user,
    friendId: req.params.id,
  })
  .then((id) => {
    res.send(id);
  });
});

module.exports = app;
