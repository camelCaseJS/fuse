var db = require('./User-db.js');
var Sequelize = require('sequelize');


var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

module.exports = User;