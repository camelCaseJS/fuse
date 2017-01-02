const Sequelize = require('sequelize');
const db = require('./User-db.js');
const User = require('./User.js');

/*
The photos table holds pairs of usersIds
and links to the photos location
*/

const Photo = db.define('photo', {
  link: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

Photo.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Photo, {
  onDelete: 'cascade',
  hooks: true,
});

module.exports = Photo;
