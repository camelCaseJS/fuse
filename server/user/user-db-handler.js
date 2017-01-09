const Promise = require('bluebird');
const User = require('../db/users/User');
const Friends = require('../db/users/User-Friends');

const emailSearch = (query) => {
  return User.findAll( { where: {
    email: query,
  }})
  .then((users) => users.map(user => user.dataValues))
}

const nameSearch = (query) => {
  return User.findAll( { where: {
    $or: [
      { firstName: query },
      { lastName: query},
    ],
  } })
  .then((users) => users.map(user => user.dataValues));
}

module.exports.nameSearch = nameSearch;

module.exports.emailSearch = emailSearch;