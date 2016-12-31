var db = require('./User-db.js');
var Sequelize = require('sequelize');

/*
The main user model for Fuse usernames are unique
Note that relations to other tables are defined
alongisde those tables and are added as decorators
*/
var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

module.exports = User;