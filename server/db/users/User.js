const db = require('./User-db.js');
const Sequelize = require('sequelize');

/*
The main user model for Fuse usernames are unique
Note that relations to other tables are defined
alongisde those tables and are added as decorators
*/
const User = db.define('user', {
  facebookId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  profilePictureURL: Sequelize.STRING,
});

module.exports = User;
