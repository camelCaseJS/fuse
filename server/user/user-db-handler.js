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
  }).then(() => {
    return 'friend search';
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

// const deleteOneFriendship = (userId, friendId) => {
//   Friendship.findAll({
//     where: {
//       $or: [
//         { userId, friendId },
//         { friendId, userId },
//       ],
//     },
//   }).then((fdsa) => {
//     console.log(fdsa);
//   });
// };

const deleteFriendships = (userId) => {
  Friendship.destroy({
    where: {
      userId,
    },
  })
  .then(() => {
    return 'Friendships deleted.';
  });
};

const deleteSentPending = (userId) => {
  console.log('got to delete sent pending');
  FriendRequest.destroy({
    where: {
      userId,
    },
  })
  .then(() => {
    return 'Sent Requests deleted.';
  });
};

const deleteReceivedPending = (userId) => {
  FriendRequest.destroy({
    where: {
      requestId: userId,
    },
  })
  .then(() => {
    return 'Received Requests deleted.';
  });
};

const sendFriendRequestDB = Promise.method((userId, requestId) => {
  const friendReq = {
    userId,
    requestId,
  };
  return FriendRequest.findOne({
    where: friendReq,
  })
  .then((results) => {
    if (results !== null) {
      console.log('Friend request already pending.');
      return 'Friend request already pending.';
    }
    console.log('Friend Request Sent!');
    FriendRequest.create(friendReq);
    return 'Friend Request Sent!';
  });
});

const getFriendRequests = Promise.method((userId) => {
  if (!userId) {
    throw new Error('no user in request');
  }
  return FriendRequest.findAll({
    where: {
      requestId: userId,
    },
  })
  .then((pendingFriendsObject) => {
    console.log(pendingFriendsObject);
    const pendingFriendIds = [];
    pendingFriendsObject.forEach((result) => {
      pendingFriendIds.push({ id: result.dataValues.userId });
    });
    return pendingFriendIds;
  })
  .then((pendingFriendIds) => {
    return User.findAll({
      where: {
        $or: pendingFriendIds,
      },
    });
  })

  .then(pendingFriendsInfo => pendingFriendsInfo.map(pendingFriend => pendingFriend.dataValues))

  .then((pendingInfoArray) => {
    return (pendingInfoArray);
  });
});

module.exports.sendFriendRequestDB = sendFriendRequestDB;

module.exports.nameSearch = nameSearch;

module.exports.emailSearch = emailSearch;

module.exports.friendshipSearch = friendshipSearch;

module.exports.getFriendRequests = getFriendRequests;

module.exports.deleteFriendships = deleteFriendships;

// module.exports.deleteOneFriendship = deleteOneFriendship;

module.exports.deleteSentPending = deleteSentPending;

module.exports.deleteReceivedPending = deleteReceivedPending;

