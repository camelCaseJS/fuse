const Promise = require('bluebird');
const User = require('../db/users/User');
const Friends = require('../db/users/User-Friends');
const FriendRequests = require('../db/users/User-Friend-Request');

const emailSearch = query => (
  User.findAll({
    where: {
      email: query,
    },
  })
  .then(users => users.map(user => user.dataValues))
);

const nameSearch = query => (
  User.findAll({
    where: {
      $or: [
        { firstName: query },
        { lastName: query },
      ],
    },
  })
  .then(users => users.map(user => user.dataValues))
);

// const friendRequestDB

module.exports.nameSearch = nameSearch;

module.exports.emailSearch = emailSearch;
