const express = require('express');
const Friendship = require('../db/users/User-Friends');
const User = require('../db/users/User');

const app = express();

app.get('/', (req, res) => {
  console.log(req.session);
  if (req.session.passport) {
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

// post req should take in id of friend the user wants to add. :id in route is friend's id

app.post('/:id', (req, res) => {
  Friendship.create({
    userId: req.session.passport.user,
    friendId: req.params.id,
  })
  .then((id) => {
    res.send(id);
  });
});

module.exports = app;
