var db = require('./User-db.js');
var User = require ('./User.js');
var Sequelize = require('sequelize');

/*
The photos table holds pairs of usersIds
and links to the photos location
*/

var Photo = db.define('photo', {
  link: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

Photo.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Photo, {
  onDelete: 'cascade',
  hooks:true, 
});

module.exports = Photo;