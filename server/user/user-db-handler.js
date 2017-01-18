const Promise = require('bluebird');
const Sequelize = require('sequelize');
const User = require('../db/users/User');
const Friends = require('../db/users/User-Friends');
const FriendRequests = require('../db/users/User-Friend-Request');

const emailSearch = query => (
  // Lower case query to ignore capitilization in search
  User.findAll({
    where: Sequelize.where(
      Sequelize.fn('lower', Sequelize.col('email')), Sequelize.fn('lower', query)),
  })
  .then(users => users.map(user => user.dataValues))
);

const nameSearch = query => (
  User.findAll({
    where: {
      $or: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('firstName')), Sequelize.fn('lower', query)),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('lastName')), Sequelize.fn('lower', query)),
      ],
    },
  })
  .then(users => users.map(user => user.dataValues))
);

// const friendRequestDB

module.exports.nameSearch = nameSearch;

module.exports.emailSearch = emailSearch;
