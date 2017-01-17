const Promise = require('bluebird');
const dbHandler = require('./user-db-handler');
const socketHandler = require('../socket-server/socket-handler');

const userSearch = (req, res) => {

  const keys = req.params.query.split(' ');
  return Promise.all(keys.map((token) => {
    console.log(token);
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
  const friendId = req.params;
  console.log(friendId, 'FRIEND IDDDDD');
};

module.exports.userSearch = userSearch;

module.exports.getUserInfo = getUserInfo;

module.exports.addFriendRequest = addFriendRequest