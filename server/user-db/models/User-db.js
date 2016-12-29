var Sequelize = require('sequelize');
var credentials = require('./config.js');


var db = new Sequelize('FuseUsers', credentials.user, credentials.password, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 20,
  },
});

db.authenticate()
  .then(err => console.log('connection established'))
  .catch(err => console.log('error:', err));

module.exports = db;