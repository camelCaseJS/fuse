const express = require('express');
const Friendship = require('../db/users/User-Friends');
const User = require('../db/users/User');

const app = express();

app.get('/', (req, res) => {
  if (req.session.passport || process.env.NODE_ENV === 'test') {
    User.findOne({
      where: {
        facebookId: req.session.passport.user.facebookId,
        // id: 1,
      },
    })
    .then((user) => {
      if (!user) {
        res.send('no friends in list');
      } else {
        Friendship.findAll({
          where: {
            userId: user.id,
            // userId: 1,
          },
        })
        .then((friends) => {
          const friendIdArray = [];
          friends.forEach((friend) => {
            friendIdArray.push(friend.friendId);
          });
          return friendIdArray;
        })
        .then((friendIdArray) => {
          const friendInfoArray = [];
          User.findAll({
            where: {
              id: friendIdArray,
            },
            attributes: {
              exclude: ['email'],
            },
          })
          .then((friendsInfo) => {
            friendsInfo.forEach((friendInfo) => {
              friendInfoArray.push(friendInfo.dataValues);
            });
            // console.log(friendInfoArray, '********friends');
            res.send(friendInfoArray);
          });
        });
      }
    });
  } else {
    console.log('no session');
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
