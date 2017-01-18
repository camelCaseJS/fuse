const Promise = require('bluebird');
const Sequelize = require('sequelize');
const User = require('../db/users/User');
const Friends = require('../db/users/User-Friends');
const FriendRequests = require('../db/users/User-Friend-Request');

const lowerCaseQuery = (column, query) => Sequelize.where(Sequelize.fn('lower', Sequelize.col(column)), Sequelize.fn('lower', query));

const emailSearch = query => (
  // Lower case query to ignore capitilization in search
  User.findAll({
    where: lowerCaseQuery('email', query),
  })
  .then(users => users.map(user => user.dataValues))
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

// const friendRequestDB

module.exports.nameSearch = nameSearch;

module.exports.emailSearch = emailSearch;
