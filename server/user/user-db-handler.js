const Promise = require('bluebird');
const Sequelize = require('sequelize');
const User = require('../db/users/User');
const FriendRequest = require('../db/users/User-Friend-Request');
const Friendship = require('../db/users/User-Friend-Request');

const lowerCaseQuery = (column, query) => Sequelize.where(Sequelize.fn('lower', Sequelize.col(column)), Sequelize.fn('lower', query));

const emailSearch = query => (
  // Lower case query to ignore capitilization in search
  User.findAll({
    where: lowerCaseQuery('email', query),
  })
  .then(users => users.map(user => user.dataValues))
);

const friendshipSearch = query => (
  Friendship.findAll({
    where: {
      userId: query,
    },
  })
);

const nameSearch = query => (
  User.findAll({
    where: {
      $or: [
        lowerCaseQuery('firstName', query),
        lowerCaseQuery('lastName', query),
      ],
    },
  })
  .then(users => users.map(user => user.dataValues))
);

const friendRequestDB = Promise.method((userId, requestId) => {
  const friendReq = {
    userId,
    requestId,
  };
  return FriendRequest.findOne({
    where: friendReq,
  })
  .then((results) => {
    console.log(results, 'REQ BACK');
    // FriendRequest.create(friendReq);
  });

});

const getFriendRequests = Promise.method((userId) => {
  if (!userId) {
    throw new Error('no user in request');
  }
  return FriendRequest.findAll({
    where: {
      userId,
    },
  })
  .then((pendingFriendsObject) => {
    const pendingFriendIds = [];
    pendingFriendsObject.forEach((result) => {
      pendingFriendIds.push({ id: result.dataValues.requestId });
    });
    return pendingFriendIds;
  })
  .then((pendingFriendIds) => {
    User.findAll({
      where: {
        $or: pendingFriendIds,
      },
    })
    .then(pendingFriendsInfo => pendingFriendsInfo.map(pendingFriend => pendingFriend.dataValues))
    .then((pendingInfoArray) => {
      return (pendingInfoArray);
    });
  });
});

module.exports.friendRequestDB = friendRequestDB;

module.exports.nameSearch = nameSearch;

module.exports.emailSearch = emailSearch;

module.exports.friendshipSearch = friendshipSearch;

module.exports.getFriendRequests = getFriendRequests;

