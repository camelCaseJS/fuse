var Sequelize = require('sequelize');
var credentials = require('./config.js');

var dbName = {
  test: 'test',
  development: 'devFuseUsers',
  prod: 'FuseUsers',  
}

var logging = (dbName[process.env.NODE_ENV] !== 'test')

var db = new Sequelize(dbName[process.env.NODE_ENV], credentials.user, credentials.password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: logging,

  pool: {
    max: 20,
  },
});

db.authenticate()
  .then(err => console.log('connection established'))
  .catch(err => console.log('error:', err));

module.exports = db;