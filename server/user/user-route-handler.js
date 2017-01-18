const Promise = require('bluebird');
const dbHandler = require('./user-db-handler');
const socketHandler = require('../socket-server/socket-handler');
const Friendship = require('../db/users/User-Friends');
const User = require('../db/users/User');

const getUserFriends = (req, res) => {
  if (req.user || process.env.NODE_ENV === 'test') {
    Friendship.findAll({
      where: {
        userId: req.user.id,
        // userId: 1,
      },
    })
    .then(friends => friends.map((friend) => {
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
        res.sendStatus(500);
      });
    });
  } else {
    console.log('no session');
    res.redirect('/api/auth/facebook');
  }
};

const getPendingFriends = (req, res) => {
  const userId = req.user.id;
  return Promise.resolve(
    dbHandler.getFriendRequests(userId),
  )
  .then((results) => {
    // console.log(results, 'RESULTS IN HANDLER');
    res.send(results);
  }).catch((err) => {
    console.log(err);
    res.send(500);
  });
};

const userSearch = (req, res) => {

  const keys = req.params.query.split(' ');
  return Promise.all(keys.map((token) => {
    if (token.match('@')) {
      return dbHandler.emailSearch(token);
    }
    return dbHandler.nameSearch(token);
  }))
  .then((results) => {
    const users = [];
    results.forEach((result) => {
      result.forEach((user) => {
        users.push(user);
      });
    });
    res.send(users);
  }).catch((err) => {
    console.log(err);
    res.send(500);
  });
};

const getUserInfo = (req, res) => {
  res.send({
    user: req.user,
    session: req.session,
  });
  // socketHandler.userRoomConnectionStart(req.session.passport.user);
};

const addFriendRequest = (req, res) => {
  const userId = req.user.id;
  const friendId = Number(req.params.id);
  dbHandler.friendRequestDB(userId, friendId);
  // .then((reqStatus) => {
  //   console.log(reqStatus);
    // if (reqStatus === 'success') {
    //   return res.send(reqStatus, '');
    // } else {
    //   return res.send('Something went wrong while adding friend.');
    // }
  // }).catch((err) => {
  //   console.log(err, 'error in add friend request, user-route-handler');
  //   res.send(500);
  // });
};

module.exports.userSearch = userSearch;

module.exports.getUserInfo = getUserInfo;

module.exports.addFriendRequest = addFriendRequest;

module.exports.getUserFriends = getUserFriends;

module.exports.getPendingFriends = getPendingFriends;

